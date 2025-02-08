import { prisma } from "../config/prisma";
import { AppError } from "../utils/app_error";

export const findUsername = async (username: string) => {
    if (!username) throw new AppError("no provide username", 400);
    const user = await prisma.user.findFirst({ where: { username } });
    return user;
}

export const findUserId = async (userID: number) => {
    if (!userID) throw new AppError("no provide userID", 400);
    const user = await prisma.user.findFirst({ where: { id: userID } });
    if (!user) throw new AppError("User not found", 404);
    return user;
}

export const getAllUserService = async () => {
    const users = await prisma.user.findMany({
        select: {
            username: true,
            profilePicture: true,
            isVerified: true,
            updatedAt: true
        }
    })

    return users
}

export const findEmail = async (email: string) => {
    if (!email) throw new AppError("no provide email", 400);
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
}

export const createUserService = async (email: string, password: string, username: string) => {
    if (!email || !password || !username) throw new AppError("no provide email or paassword or username", 400);

    const existingUsername = await findUsername(username);
    if (existingUsername) throw new AppError("username sudah tersedia", 400);

    const exisitingEmail = await findEmail(email);
    if (exisitingEmail) throw new AppError("email sudah tersedia", 400);

    const newUser = await prisma.user.create({
        data: { email, password, username }
    });

    return newUser;
}

export const deleteUserService = async (userID: number) => {
    if (!userID) throw new AppError("no provide User ID", 400);

    const existingUser = await prisma.user.findUnique({ where: { id: userID } });
    if (!existingUser) throw new AppError("no user found", 404);

    const deletedUser = await prisma.user.delete({ where: { id: userID } });

    return deletedUser;
}

export const updateUserService = async (userID: number, bio: string | undefined, email: string | undefined, password: string | undefined, username: string | undefined, profilePicture: string | undefined) => {
    if (!userID) throw new AppError("no provide User ID", 400);

    const existingUser = await prisma.user.findUnique({ where: { id: userID } });
    if (!existingUser) throw new AppError("no user found", 404);

    const updatedUser = await prisma.user.update({
        where: { id: userID },
        data: {
            bio, email, password, username, profilePicture
        }
    });
    return updatedUser;
}

export const userMeService = async (username: string) => {
    if (!username) throw new AppError("no provide User ID", 400);

    const existingUser = await prisma.user.findUnique({
        where: { username },
        include: {
            collections: true, followers: true, followings: true,
            posts: {
                include: { imageUrl: true, likes: true, comments: true },
                orderBy: { createdAt: "desc" }
            }, likes: true,
            savedPosts: {
                include: { post: { select: { imageUrl: true } } },
                orderBy: { createdAt: "desc" }
            }
        }
    });
    if (!existingUser) throw new AppError("no user found", 404);

    return existingUser;
}