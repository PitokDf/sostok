import { Request } from "express";
import { Payload } from "../services/auth.service";

export const getUserLogin = (req: Request) => {
    const userLogged = (req as any).user;
    return userLogged as Payload;
}