import { prisma } from "../config/prisma"
import { AppError } from "../utils/Apperror";

export const getFollowingUserService = async (followerID: number) => {
    const following = await prisma.follow.findMany({
        where: { followerID },
        include: { following: true }
    });

    return following;
}

export const getFollowerUserService = async (followerID: number) => {
    const follower = await prisma.follow.findMany({
        where: { followerID },
        include: { follower: true }
    });

    return follower;
}

export const followUserService = async (userLogged: number, followingID: number) => {
    if (!followingID) throw new AppError("no provide user id", 400);

    if (followingID === userLogged) throw new AppError("Tidak bisa mengikuti diri sendiri", 400);

    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerID_followingID: {
                followerID: userLogged,
                followingID: followingID
            }
        }
    });

    if (existingFollow) throw new AppError("Anda sudah memfollow pengguna ini", 400);

    const followUser = await prisma.follow.create({
        data: { followerID: userLogged, followingID }
    });

    return followUser;
}

export const unfollowUserService = async (userLogged: number, userID: number) => {
    if (!userID) throw new AppError("no provide user id", 400);

    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerID_followingID: {
                followerID: userLogged,
                followingID: userID
            }
        }
    });

    if (!existingFollow) throw new AppError("Anda todak memfollow pengguna ini", 400);

    const unfollowUser = await prisma.follow.delete({
        where: {
            followerID_followingID: {
                followerID: userLogged,
                followingID: userID
            }
        }
    });

    return unfollowUser;
}