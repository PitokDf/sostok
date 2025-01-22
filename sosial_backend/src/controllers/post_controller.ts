import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { deleteFile } from "../utils/manage_file";
import { getUserLogin } from "../utils/session";
import { createPostService, deletePostService, getPostByIdService, getPostService, getPostUserService, updatePostService } from "../services/post_service";

const destination = "posts"

export const createPostController = async (req: Request, res: Response<responseApi>) => {
    try {
        const userID = getUserLogin(req).userID;
        const imageUrl = `${process.env.BASE_URL}/${destination}/${req.file?.filename}`
        const { caption } = req.body;

        if (!userID || !imageUrl || !caption) {
            deleteFile(`${destination}/${req.file?.filename}`);
            return res.status(400).json({ success: false, statusCode: 400, msg: "Fill all field" })
        }

        const newPost = await createPostService(imageUrl, userID, caption);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil upload post",
            data: newPost
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const getPostUserController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { userId } = req.params;
        const userLoggin = getUserLogin(req).userID;

        const userID = Number(userId) || userLoggin;
        const posts = await getPostUserService(userID);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan post",
            data: posts
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const getAllPostController = async (req: Request, res: Response<responseApi>) => {
    try {
        const posts = await getPostService(getUserLogin(req).userID);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan post",
            data: posts
        })
    } catch (error) {
        return handleError(error, res);
    }
}

export const getPostByIdController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params;
        const posts = await getPostByIdService(Number(postID));

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan post",
            data: posts
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const deletePostController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params;
        const deletedPost = await deletePostService(Number(postID));
        deleteFile(deletedPost.imageUrl.split("/").at(-1)!)
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil menghapus post",
            data: deletedPost
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const updatePostController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { postID } = req.params;
        const { caption } = req.body;

        const updatedPost = await updatePostService(Number(postID), caption);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mengupdate post",
            data: updatedPost
        })
    } catch (error) {
        return handleError(error, res)
    }
}
