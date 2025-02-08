import { NextFunction, Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { generateToken, verifyAccessToken, verifyRefreshToken } from "../services/auth.service";
import { handleError } from "../utils/handle_error";

export const authenticateToken = async (req: Request, res: Response<responseApi>, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        if (!refreshToken) return res.status(401).json({ success: false, statusCode: 401, msg: "Token is required" });

        try {
            const payload = await verifyRefreshToken(refreshToken);
            const newAccessToken = await generateToken({
                bio: payload.bio,
                email: payload.email,
                isVerified: payload.isVerified,
                profilePicture: payload.profilePicture,
                userID: payload.userID,
                username: payload.username
            });
            res.cookie("accessToken", newAccessToken, { maxAge: 3600000, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
            (req as any).user = payload;
            return next();
        } catch (error) {
            return handleError(error, res);
        }
    }

    try {
        const verifyToken = await verifyAccessToken(accessToken);
        (req as any).user = verifyToken;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, statusCode: 401, msg: "Invalid or expire token" });
    }
}