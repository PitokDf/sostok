import { Response } from "express";

export const setCookie = (name: string, value: any, maxAge: number, res: Response) => {
    res.cookie(name, value,
        {
            maxAge: maxAge,
            httpOnly: true,
            sameSite: "strict",
            secure: false
        }
    )
}