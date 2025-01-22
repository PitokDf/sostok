import { Request } from "express";
import { payload } from "../services/auth_service";

export const getUserLogin = (req: Request) => {
    const userLogged = (req as any).user;
    return userLogged as payload;
}