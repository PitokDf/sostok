import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseApi } from "../types/responseApiType";
import { AppError } from "../utils/Apperror";

export const loginController = async (req: Request, res: Response<ResponseApi>) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({
            success: false, statusCode: 400, msg: "Validasi dibutuhkan", errors: errors.array()
        })
        // const { email, password, username } = req.body;
        return res.status(200).json({ success: true, msg: "Berhasil Login", statusCode: 200 })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false, statusCode: error.statusCode, msg: error.message
            })
        }
        return res.status(500).json({ success: false, statusCode: 500, msg: 'Internal server error' })
    }

    // res.json({ success: false, statusCode: 500, msg: "" })
}