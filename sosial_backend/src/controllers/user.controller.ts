import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { findUserId, getAllUserService, searchUserProfileService, updateUserService, userMeService } from "../services/user.service";
import { hashPassword, Payload, verifyAccessToken } from "../services/auth.service";
import { deleteFile } from "../utils/manage_file";

const mapProfile = (user: any, accessToken: string, userLoggin: any) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        postsCount: user?.posts?.length,
        followings: user.followers.length,
        followers: user.followings.length,
        likeReceiveCount: user?.likes?.length,
        isOwnProfile: !accessToken ? false : userLoggin?.userID === user.id,
        isFollowing: !accessToken ? false : user.followings.some((v: any) => v.followerID === (userLoggin! as Payload).userID),
        posts: user?.posts?.map((post: any) => ({
            id: post.id,
            images: post.imageUrl.map((image: any) => image.fileLink),
            likeCount: post.likes.length,
            commentCount: post.comments.length
        })),
        savedPost: user?.savedPosts?.map((savedPost: any) => ({
            id: savedPost.id,
            imageUrl: savedPost.post.imageUrl.map((url: any) => url.fileLink)[0]
        }))
    }
}

export const profileController = async (req: Request, res: Response<responseApi>) => {
    try {
        const accessToken = req.headers.authorization?.split("Bearer ")[1];
        let userLoggin;
        if (accessToken) userLoggin = await verifyAccessToken(accessToken)

        const { username } = req.params;
        const user = await userMeService(username || userLoggin?.username!);

        const profile = mapProfile(user, accessToken!, userLoggin)
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

export const getAllUserController = async (req: Request, res: Response<responseApi>) => {
    try {
        const users = await getAllUserService()
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Get all users",
            data: users
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export const deleteProfilePictureController = async (req: Request, res: Response<responseApi>) => {
    try {

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

export const searchUserProfilesController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { query } = req.params
        const accessToken = req.headers.authorization?.split("Bearer ")[1];
        const userLoggin = await verifyAccessToken(accessToken!);

        const users = await searchUserProfileService(query)
        const userMap = users.map((user) => (
            mapProfile(user, accessToken!, userLoggin)
        ))

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan data.",
            data: userMap
        })
    } catch (error) {
        return handleError(error, res)
    }
}