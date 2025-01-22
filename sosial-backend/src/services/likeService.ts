import { prisma } from "../config/prisma";
import { AppError } from "../utils/Apperror";

export const createLikeService = async (postID: number, userID: number) => {
    if (!postID || !userID) throw new AppError("no provide Post ID or User ID", 400);

    const like = await prisma.like.create({ data: { postID, userID } });

    return like;
}

export const deleteLikeService = async (postID: number, userID: number) => {
    if (!postID || !userID) throw new AppError("no provide Post ID or User ID", 400);
    const deletedLike = await prisma.like.delete({
        where: {
            postID_userID: {
                postID, userID
            }
        }
    });

    return deletedLike;
}

export const getLikesPostService = async (postID: number) => {
    if (!postID) throw new AppError("no provide Post ID", 400);

    const likes = await prisma.like.findMany({ where: { postID }, include: { user: true } });

    return likes
}