import { prisma } from "../config/prisma";
import { AppError } from "../utils/app_error";
import { getFollowingUserService } from "./follow.service";

const include = {
    comments: true,
    likes: true,
    imageUrl: true,
    postHashtag: { select: { hashtag: { select: { name: true } } } }
};
export const createPostService = async (imageUrl: Array<string>, userID: number, caption?: string, hastags?: Array<string>) => {
    if (!imageUrl) throw new AppError("Validasi input", 400);
    const imageData = imageUrl.map((url) => ({ fileLink: url }));

    const newPost = await prisma.$transaction(async (tx) => {
        const posts = await tx.post.create({
            data: { imageUrl: { create: imageData }, userID, caption },
            include: { imageUrl: true }
        });

        if (hastags && hastags.length > 0) {
            for (const name of hastags) {
                let hastag = await tx.hashtag.findUnique({ where: { name: name.replace("#", "") } });
                if (!hastag) {
                    hastag = await tx.hashtag.create({ data: { name: name.replace("#", "") } });
                }

                await tx.postHashtag.create({
                    data: { postId: posts.id, hashtagId: hastag.id }
                });
            }
        }

        return posts;
    });

    if (!newPost) throw new AppError("Gagal membuat post", 400);
    return newPost;
}

export const getPostService = async (userID: number) => {
    const following = await getFollowingUserService(userID);
    const posts = await prisma.post.findMany({
        where: { user: { id: { in: following.map((follow) => follow.followingID) } } },
        include: {
            comments: true,
            user: true,
            likes: true,
            imageUrl: true,
            collectionPost: true,
            postHashtag: { select: { hashtag: { select: { name: true } } } }
        },
        orderBy: { createdAt: "desc" }
    });

    return posts;
}

export const getPostByIdService = async (postID: number) => {
    if (!postID) throw new AppError("no provide post id", 400);

    const post = await prisma.post.findMany({
        where: { id: postID },
        include: include
    });

    return post;
}

export const getPostUserService = async (userID: number) => {
    if (!userID) throw new AppError("no provide user id", 400);

    const post = await prisma.post.findMany({
        where: { userID },
        include: { postHashtag: true, likes: true, imageUrl: true }
    });

    return post;
}

export const updatePostService = async (postID: number, caption: string) => {
    if (!postID) throw new AppError("no provide post id", 400);

    const post = await prisma.post.findFirst({ where: { id: postID } });
    if (!post) throw new AppError("Post not found", 404);

    const updatedPost = await prisma.post.update({ where: { id: postID }, data: { caption } });
    return updatedPost;
}

export const deletePostService = async (postID: number) => {
    if (!postID) throw new AppError("no provide post id", 400);

    const post = await prisma.post.findFirst({ where: { id: postID } });

    if (!post) throw new AppError("Post not found", 404);
    const deletedPost = await prisma.post.delete({ where: { id: postID }, include: { imageUrl: true } });

    return deletedPost;
}

