import { NextFunction, Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { verifyAccessToken } from "../services/auth.service";

export const authenticateToken = async (req: Request, res: Response<responseApi>, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")![1];
    if (!token) return res.status(401).json({ success: false, statusCode: 401, msg: "Token is required" });
    try {
        const verifyToken = await verifyAccessToken(token);
        (req as any).user = verifyToken;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, statusCode: 401, msg: "Invalid or expire token" });
    }
}