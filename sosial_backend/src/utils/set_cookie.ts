import { Response } from "express";

export const setCookie = (name: string, value: any, maxAge: number, res: Response) => {
    res.cookie(name, value,
        {
            maxAge: maxAge,
            // partitioned: process.env.NODE_ENV === "production",
            httpOnly: true,
            // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            // secure: process.env.NODE_ENV === "production"
        }
    )
}