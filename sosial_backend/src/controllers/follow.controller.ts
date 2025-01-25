import { Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "../utils/handle_error";
import { getUserLogin } from "../utils/session";
import { followUserService, unfollowUserService } from "../services/follow.service";

export const followUserController = async (req: Request, res: Response<responseApi>) => {
    try {
        const userLogged = getUserLogin(req).userID;
        const { followingID } = req.body;

        const newFollow = await followUserService(userLogged, followingID);

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: `berhasil memfollow ${newFollow.following.username}`
        });
    } catch (error) {
        return handleError(error, res);
    }
}

export const unfollowUserController = async (req: Request, res: Response<responseApi>) => {
    try {
        const userLogged = getUserLogin(req).userID;
        const { followingID } = req.body;

        const unFollow = await unfollowUserService(userLogged, Number(followingID));

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: `berhasil unfollow ${unFollow.following.username}`
        });
    } catch (error) {
        return handleError(error, res);
    }
}