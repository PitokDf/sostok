import { prisma } from "../config/prisma";
import { AppError } from "../utils/app_error"

export const getMessageService = async (conversationID: string) => {
    if (!conversationID) throw new AppError("No provide conversationID", 400);

    const messages = await prisma.message.findMany({
        where: { conversationID },
        orderBy: { createdAt: "desc" },
        take: 35
    })

    return messages
}

export const createMessageService = async (text: string, conversationID: string, senderID: number, receiverID: number) => {
    if (!text || !conversationID || !senderID || !receiverID) throw new AppError("No provide text or conversationID or senderID or receiverID", 400)
    const newMessage = await prisma.message.create({
        data: {
            text,
            conversationID,
            senderID,
            receiverID,
        }
    })

    return newMessage
}

export const deleteMessageService = async (id: number) => {
    if (!id) throw new AppError("No provide Message id", 400)

    const deletedMessage = await prisma.message.delete({
        where: { id },
        include: { conversation: { select: { id: true } } }
    })

    return deletedMessage
}

export const editMessageService = async (id: number, text: string) => {
    if (!id) throw new AppError("No provide messageID", 400)
    const editedMessage = await prisma.message.update({
        data: { text },
        where: { id }
    })

    return editedMessage
}