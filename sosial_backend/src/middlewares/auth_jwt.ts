import { NextFunction, Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { verifyAccessToken } from "../services/auth.service";

export const authenticateToken = async (req: Request, res: Response<responseApi>, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split("Bearer ")[1]!

    try {
        const verifyToken = await verifyAccessToken(accessToken);
        (req as any).user = verifyToken;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, statusCode: 401, msg: "Invalid or expire token" });
    }
}