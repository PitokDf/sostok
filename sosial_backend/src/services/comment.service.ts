import { prisma } from "../config/prisma";
import { AppError } from "../utils/app_error"

export const getCommentService = async (postID: number) => {
    if (!postID) throw new AppError("No provide postID", 400);

    const comments = await prisma.comment.findMany({
        where: { postID },
        include: { user: true },
        orderBy: { createdAt: "desc" }
    })

    return comments
}

export const createCommentService = async (text: string, postID: number, userID: number) => {
    if (!text || !postID || !userID) throw new AppError("No provide text or postID or userID", 400);

    const newComment = await prisma.comment.create({
        data: { text, userID, postID },
        include: { user: { select: { username: true, isVerified: true, profilePicture: true } } }
    })

    return newComment
}

export const delteCommentService = async (commentID: number) => {
    if (!commentID) throw new AppError("No provide commentID", 400)

    const deletedComment = await prisma.comment.delete({
        where: { id: commentID }
    })
    return deletedComment;
}