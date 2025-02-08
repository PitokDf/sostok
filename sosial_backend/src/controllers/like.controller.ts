import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { getUserLogin } from "../utils/session";
import { likePostService, unLikePostService } from "../services/like.service";

export const unLikePostController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params;
        const userID = await getUserLogin(req).userID;

        const unLike = await unLikePostService(Number(postID), userID)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil unlike postingan",
            data: unLike
        });
    } catch (error) {
        return handleError(error, res);
    }
}
export const likePostController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params;
        const userID = await getUserLogin(req).userID;

        const like = await likePostService(Number(postID), userID)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil menyukai postingan",
            data: like
        });
    } catch (error) {
        return handleError(error, res);
    }
}