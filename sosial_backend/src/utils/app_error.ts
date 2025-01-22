import { NextFunction, Request, Response } from "express";
import { responseApi } from "../types/response_type";
import { handleError } from "./handle_error";
import { validationResult } from "express-validator";

export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const expressValidatorResult = (req: Request, res: Response<responseApi>, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, statusCode: 400, msg: "validation require", errors: errors.array() });
        next();
    } catch (error) {
        handleError(error, res)
    }
}