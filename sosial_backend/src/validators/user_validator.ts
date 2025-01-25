import { check } from "express-validator";
import { findUsername } from "../services/user.service";
import { AppError, expressValidatorResult } from "../utils/app_error";
import { NextFunction, Request, Response } from "express";

export const userValidator = [
    check("username")
        .optional() // melakukan validasi kalau username diikut sertakan pada request body 
        .custom(async (value, { req }) => {
            const currentUsername = req.user.username;
            if (value == currentUsername) return true;
            const username = await findUsername(value);
            if (username) throw new AppError("Username sudah tersedia", 400)
        }), // melakukan pengecekan username apakah tersedia atau belum
    check("password")
        .optional()
        .isLength({ min: 8 }).withMessage("password min 8 characters").bail() // mastikan panjang password minimal 8 karakter
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/) // password harus terdiri dari huruf kecil, besar, angkan, dan simbol
        .withMessage("Password must include uppercase, lowercase, number, and special character")
    ,
    (req: Request, res: Response, next: NextFunction) => {
        expressValidatorResult(req, res, next);
    }
]