import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { ResponseApi } from "../types/responseApiType";

export const authMiddleware = async (req: Request, res: Response<ResponseApi>, next: NextFunction) => {
    const token = req.header("Authorization")?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ success: false, statusCode: 401, msg: "Token tidak ditemukan" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SCREET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            statusCode: 401,
            msg: "Token tidak valid"
        })
    }
}