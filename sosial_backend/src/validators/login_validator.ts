import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { expressValidatorResult } from "../utils/app_error";

export const loginValidator = [
    check("email").notEmpty().withMessage("email is required").bail()
        .isEmail().withMessage("enter a valid email"),
    check("password").notEmpty().withMessage("password is required"),
    (req: Request, res: Response, next: NextFunction) => {
        expressValidatorResult(req, res, next);
    }
]