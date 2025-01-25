import { prisma } from "../config/prisma"
import { AppError } from "../utils/app_error";

export const getFollowingUserService = async (userID: number) => {
    const following = await prisma.follow.findMany({
        where: {
            followerID: userID
        },
        include: { following: true }
    });
    return following;
}

export const followUserService = async (userID: number, followingID: number) => {
    if (!userID || !followingID) throw new AppError("No provide user id or following id", 400);

    if (followingID === userID) throw new AppError("Tidak bisa mengikuti diri sendiri", 400);

    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerID_followingID: {
                followerID: userID,
                followingID: followingID
            }
        }
    });

    if (existingFollow) throw new AppError("Anda sudah mengikuti pengguna ini", 400);

    const follow = await prisma.follow.create({
        data: {
            followerID: userID,
            followingID: followingID
        },
        include: { following: true }
    });

    return follow;
}

export const unfollowUserService = async (userID: number, followingID: number) => {
    if (!userID || !followingID) throw new AppError("No provide user id or following id", 400);

    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerID_followingID: {
                followerID: userID,
                followingID: followingID
            }
        }
    });

    if (!existingFollow) throw new AppError("Anda tidak mengikuti pengguna ini", 400);

    const follow = await prisma.follow.delete({
        where: {
            followerID_followingID: {
                followerID: userID,
                followingID
            }
        },
        include: { following: true }
    });

    return follow;
}
