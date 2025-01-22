import { prisma } from "../config/prisma"
import { AppError } from "../utils/Apperror";

export const createCommentService = async (postID: number, userID: number, text: string) => {
    if (!postID || !userID || !text) throw new AppError("Isi semua kolom", 400);

    const newComment = await prisma.comment.create({
        data: { text, postID, userID },
        include: { user: true, post: true }
    })

    return newComment;
}

export const getCommentService = async (postID: number) => {
    if (!postID) throw new AppError("no provide Post ID", 400);

    const comments = await prisma.comment.findMany({ where: { postID } });
    return comments;
}

export const deleteCommentService = async (commnetID: number) => {
    if (!commnetID) throw new AppError("no provide Comment ID", 400);

    const deletedCommnet = await prisma.comment.delete({
        where: { id: commnetID }
    });

    return deletedCommnet;
}