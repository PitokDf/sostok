import { prisma } from "../config/prisma";
import { AppError } from "../utils/Apperror"

export const createMessageService = async (senderID: number, receiverID: number, conversationID: number, text: string) => {
    if (!senderID || !receiverID || !text) throw new AppError("no provide Sender conversation ID ID or Receiver ID or text", 400);

    const newMessage = await prisma.message.create({
        data: { senderID, receiverID, text, conversationID }
    });

    return newMessage;
}

export const getConversetionMessageService = async (conversationID: number) => {
    if (!conversationID) throw new AppError("no provide conversation ID", 400);

    const conversationMessage = await prisma.message.findMany({
        where: { conversationID }
    })

    return conversationMessage;
}

export const deleteMessageService = async (messageID: number) => {
    if (!messageID) throw new AppError("no provide message ID", 400);

    const deletedMessage = await prisma.message.delete({ where: { id: messageID } });

    return deletedMessage;
}