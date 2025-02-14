import { Response } from "express";

export const setCookie = (name: string, value: any, maxAge: number, res: Response) => {
    console.log("Setting cookie:", name, value);

    res.cookie(name, value, {
        maxAge: maxAge,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    console.log("Cookies set successfully");
};
