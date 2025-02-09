import { Request, Response } from "express";
import { handleError } from "../utils/handle_error";
import { responseApi } from "../types/response_type";
import { getUserLogin } from "../utils/session";
import { getAllConversationService, initiateConversationService } from "../services/conversation.service";
import { pusher } from "../config/pusher";

export const getAllConversationController = async (req: Request, res: Response<responseApi>) => {
    try {
        const currentUser = await getUserLogin(req);
        const conversations = await getAllConversationService(currentUser.userID)

        const conversationsList = conversations.map((covo) => {
            const userOnConversation = covo.particapants.filter((participant) => participant.userId !== currentUser.userID)
                .map(parti => parti.user)[0];

            const senderID = covo.messages[0]?.senderID;
            return {
                conversationID: covo.id,
                receiverID: covo.particapants.filter((parti) => parti.userId !== currentUser.userID)[0].userId,
                username: userOnConversation.username,
                currentUser: currentUser.userID,
                senderID,
                lastMessage: senderID === currentUser.userID ? `Anda: ${covo.messages[0].text}` : covo.messages[0]?.text,
                timeStamp: covo.messages[0]?.createdAt,
                avatar: covo.particapants.filter(
                    (participant) => participant.userId !== currentUser.userID)
                    .map(parti => parti.user.profilePicture)[0]
            }
        }).sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime())

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan conversation",
            data: conversationsList
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const initiateConversationController = async (req: Request, res: Response<responseApi>) => {
    try {
        const userID = await getUserLogin(req).userID
        const { targetUserID } = req.body

        const initiateConversation = await initiateConversationService(userID, targetUserID)

        const userOnConversation = initiateConversation.particapants.filter((participant) => participant.userId !== userID)
            .map(parti => parti.user)[0];
        const conversation = {
            conversationID: initiateConversation.id,
            receiverID: initiateConversation.particapants.filter((parti) => parti.userId !== userID)[0].userId,
            username: userOnConversation.username,
            currentUser: userID,
            lastMessage: initiateConversation.messages[0]?.text,
            timeStamp: initiateConversation.messages[0]?.createdAt,
            avatar: initiateConversation.particapants.filter(
                (participant) => participant.userId !== userID)
                .map(parti => parti.user.profilePicture)[0]
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan conversation",
            data: conversation
        })

    } catch (error) {
        return handleError(error, res)
    }
}

export const typingHandler = async (req: Request, res: Response<responseApi>) => {
    try {
        const { conversationID } = req.params
        const user = await getUserLogin(req)
        await pusher.trigger(`chats-${conversationID}`, 'typing', { userID: user.userID })
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "berhasil metriger"
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const stopTypingHandler = async (req: Request, res: Response<responseApi>) => {
    try {
        const { conversationID } = req.params
        const user = await getUserLogin(req)
        await pusher.trigger(`chats-${conversationID}`, 'stop-typing', { userID: user.userID })
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "berhasil metriger"
        })
    } catch (error) {
        return handleError(error, res)
    }
}