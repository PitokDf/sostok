import { Response } from "express"
import { AppError } from "./app_error"
import { responseApi } from "../types/response_type"

export const handleError = (error: any, res: Response<responseApi>) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ success: false, statusCode: error.statusCode, msg: error.message });
    }
    return res.status(500).json({ success: false, msg: "internal server error", statusCode: 500, errors: error.message })
}