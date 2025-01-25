import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { findEmail, findUsername } from "../services/user.service";
import { AppError, expressValidatorResult } from "../utils/app_error";

export const registerValidator = [
    check("username").notEmpty().withMessage("username is required").bail()
        .isLength({ min: 6 }).withMessage("username min 6 characters").bail()
        .custom(async (value) => {
            const checkUsername = await findUsername(value);
            if (checkUsername) throw new AppError("username already in use", 400)
        }),
    check("email").notEmpty().withMessage("email is required").bail()
        .isEmail().withMessage("enter valid email").bail()
        .custom(async (value) => {
            const checkEmail = await findEmail(value);
            if (checkEmail) throw new AppError("email already in use", 400);
        }),
    check("password").notEmpty().withMessage("password is required").bail()
        .isLength({ min: 8 }).withMessage("password min 8 characters").bail()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        .withMessage("Password must include uppercase, lowercase, number, and special character"),
    (req: Request, res: Response, next: NextFunction) => {
        expressValidatorResult(req, res, next);
    }
]