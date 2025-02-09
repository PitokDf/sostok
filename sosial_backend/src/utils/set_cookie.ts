import { Response } from "express";

export const setCookie = (name: string, value: any, maxAge: number, res: Response) => {
    res.cookie(name, value,
        { maxAge: maxAge, httpOnly: true, sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", secure: process.env.NODE_ENV === "production" }
    )
}