import { Request, Response } from "express";
import { handleError } from "../utils/handle_error";
import { getUserLogin } from "../utils/session";
import { pusher } from "../config/pusher";

export const pusherAuthController = async (req: Request, res: Response) => {
    try {
        const { socketID, channelName, socket_id } = req.body

        const userLogin = getUserLogin(req)

        if (!userLogin) return res.status(403).json({ message: "Unauthorized" });

        const authResponse = pusher.authorizeChannel(socketID, channelName, {
            user_id: String(userLogin.userID),
            user_info: {
                name: userLogin.username,
                email: userLogin.email,
                avatar: userLogin.profilePicture
            }
        })

        res.send(authResponse)
    } catch (error) {
        return handleError(error, res)
    }
}