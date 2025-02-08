import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { getUserLogin } from "../utils/session";
import { savePostinganService, unSavePostinganService } from "../services/save_post.service";

export const savePostinganController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params
        const user = await getUserLogin(req)
        const savedPost = await savePostinganService(Number(postID), user.userID)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "berhasil menyimpan postingan"
        })
    } catch (error) {
        return handleError(error, res)
    }
}
export const unSavePostinganController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params
        const user = await getUserLogin(req)
        await unSavePostinganService(Number(postID), user.userID)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "berhasil menghapus dari daftar save postingan"
        })
    } catch (error) {
        return handleError(error, res)
    }
}