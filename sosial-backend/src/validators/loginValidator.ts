import { check } from "express-validator";

export const loginValidator = [
    check('email').notEmpty().withMessage("email dibutuhkan").bail()
        .isEmail().withMessage("Masukkan email yang valid"),
    check("password").notEmpty().withMessage("password dibutuhkan"),
]