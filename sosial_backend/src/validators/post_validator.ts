import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { expressValidatorResult } from "../utils/app_error";

export const createPostValidator = [
    check("image").notEmpty().withMessage("Image is required"),
    check("caption").notEmpty().withMessage("caption is required"),
    (req: Request, res: Response, next: NextFunction) => {
        expressValidatorResult(req, res, next);
    }
]