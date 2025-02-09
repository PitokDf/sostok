import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { createMessageService, deleteMessageService, editMessageService, getMessageService } from "../services/message.service";
import { getUserLogin } from "../utils/session";
import { Message } from "@prisma/client";
import { pusher } from "../config/pusher";

const mapMessage = (message: Message) => {
    return {
        id: message.id,
        isMine: message.senderID,
        conversationID: message.conversationID,
        senderID: message.senderID,
        receiverID: message.receiverID,
        content: message.text,
        timestamp: message.createdAt,
    }
}

export const getMessageController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { conversationID } = req.params

        const messages = await getMessageService(conversationID)
        const listMessage = messages.map(msg => mapMessage(msg)).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan message",
            data: listMessage
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const createMessageController = async (req: Request, res: Response<responseApi>) => {
    try {
        const currentUser = await getUserLogin(req)
        const { conversationID } = req.params
        const { content, receiverID } = req.body
        const newMessage = await createMessageService(content, conversationID, currentUser.userID, Number(receiverID))
        const message = mapMessage(newMessage)
        await pusher.trigger(`chat-${conversationID}`, 'new-message', message)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mengirim pesan",
            data: message
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const deleteMessageController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { messageID } = req.params

        const deletedMessage = await deleteMessageService(Number(messageID))
        await pusher.trigger(`chat-${deletedMessage.conversation.id}`, 'delete-message', { id: deletedMessage.id })
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil menghapus pesan"
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const editMessageController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { messageID } = req.params
        const { content } = req.body

        const editedMessage = await editMessageService(Number(messageID), content)
        pusher.trigger(`chat-${editedMessage.conversationID}`, 'edit-message', mapMessage(editedMessage))
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mengupdate message",
            data: editedMessage
        })
    } catch (error) {
        return handleError(error, res)
    }
}