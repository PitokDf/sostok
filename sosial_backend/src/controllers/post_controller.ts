import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { deleteFile } from "../utils/manage_file";
import { getUserLogin } from "../utils/session";
import { createPostService, deletePostService, getPostByIdService, getPostService, getPostUserService, updatePostService } from "../services/post_service";

const destination = "posts"

export const createPostController = async (req: Request, res: Response<responseApi>) => {
    try {
        const files = req.files as Express.Multer.File[];
        const userID = getUserLogin(req).userID;
        let { caption } = req.body;
        caption = (caption as string).trim();

        const hastags = (caption as string).split(" ").filter(hastag => hastag.startsWith("#"));
        let imageUrls: Array<string> = [];

        files.map((file, _index) => {
            imageUrls.push(`${process.env.BASE_URL}/${destination}/${file.filename}`)
        })


        if (!userID || imageUrls.length == 0 || !caption) {
            files.map((file, _index) => {
                deleteFile(`${destination}/${file.filename}`);
            })
            return res.status(400).json({ success: false, statusCode: 400, msg: "Fill all field" })
        }

        const newPost = await createPostService(imageUrls, userID, caption, hastags);

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
        let posts = await getPostUserService(userID);
        posts = posts.map((post) => ({
            ...post,
            hastag: post.postHashtag.map((relation) => relation.hashtag.name)
        }));

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
        deletedPost.imageUrl.map((image, _index) => {
            deleteFile(image.fileLink.split("/").at(-1)!)
        });

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
