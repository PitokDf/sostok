import { prisma } from "../config/prisma";
import { AppError } from "../utils/app_error"

export const existingLike = async (postID: number, userID: number) => {
    const like = await prisma.like.findFirst({
        where: {
            AND: {
                postID,
                userID
            }
        }
    });

    return like ? true : false;
}

export const unLikePostService = async (postID: number, userID: number) => {
    if (!postID || !userID) throw new AppError("no provide postID", 400);
    if (!(await existingLike(postID, userID))) throw new AppError("Belum menyukai postingan ini", 400)
    const unLikePost = await prisma.like.delete({
        where: { postID_userID: { postID, userID } }
    });
    return unLikePost;
}

export const likePostService = async (postID: number, userID: number) => {
    if (!postID || !userID) throw new AppError("no provide postID", 400);
    if (await existingLike(postID, userID)) throw new AppError("Sudah menyukai postingan ini", 400)
    const likePost = await prisma.like.create({
        data: { postID, userID }
    });

    return likePost;
}