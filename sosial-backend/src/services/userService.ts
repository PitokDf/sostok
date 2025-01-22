import { prisma } from "../config/prisma";
import { AppError } from "../utils/Apperror"

export const findUsername = async (username: string) => {
    if (!username) throw new AppError("no provide username", 400);
    const user = await prisma.user.findFirst({ where: { username } });
    return user;
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

export const updateUserService = async (userID: number, bio: string, email: string, password: string, username: string, profilePicture: string) => {
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

export const userMeService = async (userID: number) => {
    if (!userID) throw new AppError("no provide User ID", 400);

    const existingUser = await prisma.user.findUnique({ where: { id: userID } });
    if (!existingUser) throw new AppError("no user found", 404);

    return existingUser;
}