import { check } from "express-validator";
import { expressValidatorResult } from "../utils/app_error";
import { NextFunction, Request, Response } from "express";

export const followValidator = [
    check("followingID").notEmpty().withMessage("followingID is required"),
    (req: Request, res: Response, next: NextFunction) => {
        expressValidatorResult(req, res, next);
    }
]