import { prisma } from "../config/prisma";
import { AppError } from "../utils/Apperror"
import { getFollowingUserService } from "./followService";

export const createPostService = async (imageUrl: string, caption?: string) => {
    if (!imageUrl) throw new AppError("Validasi input", 400);

    const newPost = await prisma.post.create({
        data: { imageUrl, userID: 1, caption }
    });

    if (!newPost) throw new AppError("Gagal membuat posts", 400);

    return newPost;
}

export const getPostService = async (userID: number) => {
    const following = await getFollowingUserService(userID);

    const posts = await prisma.post.findMany({
        where: { user: { id: { in: following.map((follow) => follow.followingID) } } },
        include: { user: true, comments: true, likes: true },
        orderBy: { createdAt: "desc" }
    });

    return posts;
}

export const getPostUserService = async (userID: number) => {
    if (!userID) throw new AppError("no provide user id", 400);

    const post = await prisma.post.findFirst({
        where: { userID },
        include: { user: true, comments: true, likes: true }
    });

    return post;
}

export const updatePostService = async (postID: number, caption: string) => {
    if (!postID || !caption) throw new AppError("no provide post id or caption", 400);

    const updatedPost = await prisma.post.update({ where: { id: postID }, data: { caption } });

    return updatedPost;
}

export const deletePostService = async (postID: number) => {
    if (!postID) throw new AppError("no provide post id", 400);

    const deletedPost = await prisma.post.delete({ where: { id: postID } });

    return deletedPost;
}

