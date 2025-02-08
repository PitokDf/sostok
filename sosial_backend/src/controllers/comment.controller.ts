import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { createCommentService, delteCommentService, getCommentService } from "../services/comment.service";
import { getUserLogin } from "../utils/session";

export const getCommentController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params
        const comments = await getCommentService(Number(postID))
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan data",
            data: comments
        })
    } catch (error) {
        return handleError(error, res);
    }
}
export const deleteCommentController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { commentID } = req.params
        const deletedComment = await delteCommentService(Number(commentID))
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil menghapus komentar",
            data: deletedComment
        })
    } catch (error) {
        return handleError(error, res);
    }
}

export const createCommentController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params
        const { text } = req.body
        const user = getUserLogin(req)
        const comments = await createCommentService(text, Number(postID), user.userID)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil menambahkan komentar",
            data: comments
        })
    } catch (error) {
        return handleError(error, res);
    }
}