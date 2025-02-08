import { prisma } from "../config/prisma";
import { AppError } from "../utils/app_error"

export const getAllConversationService = async (userID: number) => {
    if (!userID) throw new AppError("No provide userID", 400);

    const conversations = await prisma.conversation.findMany({
        where: {
            particapants: { some: { userId: userID } }
        },
        include: {
            messages: { take: 1, orderBy: { createdAt: "desc" } }, particapants: {
                include: {
                    user: {
                        select: { username: true, id: true, profilePicture: true }
                    }
                }
            }
        },
        orderBy: {}
    })

    return conversations
}

export const getConversationService = async (conversationID: string) => {
    if (!conversationID) throw new AppError("No provide conversationID", 400);

    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationID },
        include: { messages: true, particapants: true }
    })

    if (!conversation) throw new AppError("No conversation found", 404);

    return conversation
}

export const existingConversationService = async (currentuUserID: number, targetUserID: number) => {
    if (!currentuUserID || !targetUserID) throw new AppError("No provide currentuUserID or targetUserID", 400);

    const conversation = await prisma.conversation.findFirst({
        where: {
            particapants: { every: { userId: { in: [currentuUserID, targetUserID] } } },
            AND: [
                { particapants: { some: { userId: currentuUserID } } },
                { particapants: { some: { userId: targetUserID } } }
            ]
        },
        include: {
            messages: { take: 1, orderBy: { createdAt: "desc" } }, particapants: {
                include: {
                    user: {
                        select: { username: true, id: true, profilePicture: true }
                    }
                }
            }
        }
    })

    return conversation
}

export const createConversationService = async (currentuUserID: number, targetUserID: number) => {
    if (!currentuUserID || !targetUserID) throw new AppError("No provide currentuUserID or targetUserID", 400);

    const newConversation = await prisma.conversation.create({
        data: {
            userId: currentuUserID,
            particapants: {
                create: [
                    { userId: currentuUserID, role: "" },
                    { userId: targetUserID, role: "" }
                ]
            }
        },
        include: {
            messages: { take: 1, orderBy: { createdAt: "desc" } }, particapants: {
                include: {
                    user: {
                        select: { username: true, id: true, profilePicture: true }
                    }
                }
            }
        }
    })

    return newConversation
}

export const initiateConversationService = async (currentuUserID: number, targetUserID: number) => {
    if (!currentuUserID || !targetUserID) throw new AppError("No provide currentuUserID or targetUserID", 400);

    let conversation;
    const existingConversation = await existingConversationService(currentuUserID, targetUserID)
    console.log(existingConversation);

    if (existingConversation) {
        conversation = existingConversation
        console.log("exisiting conversation");
    } else {
        conversation = await createConversationService(currentuUserID, targetUserID)
        console.log("new conversation");
    }


    return conversation
}