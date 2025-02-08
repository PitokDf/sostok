import { prisma } from "../config/prisma";
import { AppError } from "../utils/app_error"

const existingSavePostingan = async (postID: number, userID: number) => {
    const saved = await prisma.savedPost.findFirst({
        where: {
            AND: { postID, userID },
        }
    })

    return saved
}

export const savePostinganService = async (postID: number, userID: number) => {
    if (!postID || !userID) throw new AppError("No provide postID or userID", 400);
    const exisitingSave = await existingSavePostingan(postID, userID);
    if (exisitingSave) throw new AppError("postingan sudah tersimpan", 400)
    const savedPost = await prisma.savedPost.create({
        data: { userID, postID }
    })

    return savedPost
}

export const unSavePostinganService = async (postID: number, userID: number) => {
    if (!postID || !userID) throw new AppError("No provide postID or userID", 400);
    const exisitingSave = await existingSavePostingan(postID, userID);
    if (!exisitingSave) throw new AppError("postingan belum tersimpan", 400)
    const savedPost = await prisma.savedPost.delete({
        where: { id: exisitingSave.id }
    })

    return savedPost
}

