import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { findUserId, updateUserService, userMeService } from "../services/user.service";
import { getUserLogin } from "../utils/session";
import { hashPassword } from "../services/auth.service";
import { deleteFile } from "../utils/manage_file";

export const profileController = async (req: Request, res: Response<responseApi>) => {
    try {
        const userLoggin = getUserLogin(req);
        const { userID } = req.params;
        const user = await userMeService(Number(userID) || userLoggin.userID);

        const profile = {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
            isVerified: user.isVerified,
            followers: user.followers.length,
            followings: user.followings.length,
            likeReceiveCount: user.likes.length,
            posts: user.posts.map((post) => ({
                id: post.id,
                images: post.imageUrl.map((image) => image.fileLink),
                likeCount: post.likes.length,
                commentCount: post.comments.length
            }))
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan data.",
            data: profile
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const updateUserController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { userID } = req.params;
        const { bio, password, username } = req.body;
        const profilePicture = req.file ? `${process.env.BASE_URL}/profiles/${req.file?.filename}` : undefined;
        const user = await findUserId(Number(userID));

        let hashedPassword;
        if (password) hashedPassword = await hashPassword(password);
        const updatedUser = await updateUserService(Number(userID), bio, undefined, hashedPassword, username, profilePicture);

        // delete file sebelumnya
        if (profilePicture && user?.profilePicture !== null) deleteFile(`profiles/${user?.profilePicture?.split("/").pop()}`);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mengupdate profile",
            data: updatedUser
        });
    } catch (error) {
        return handleError(error, res)
    }
}