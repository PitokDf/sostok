import { Request, Response } from "express"
import { handleError } from "../utils/handle_error"
import { responseApi } from "../types/response_type";
import { createUserService, findEmail } from "../services/user.service";
import { compare } from "bcryptjs"
import { generateRefreshToken, generateToken, getMeInfoService, hashPassword, verifyRefreshToken } from "../services/auth.service";
import { parseCookie } from "../utils/parse_cookie";
import { getUserLogin } from "../utils/session";

export const loginController = async (req: Request, res: Response<responseApi>) => {
    try {
        let accessTokenStored = req.headers.cookie?.split(";")[1];
        if (accessTokenStored) {
            accessTokenStored.split("=")[1]
            if (accessTokenStored) return res.status(403).json({
                success: false,
                statusCode: 403,
                msg: "you already login"
            })
        }

        const { email, password } = req.body;
        const userExisting = await findEmail(email);

        if (!userExisting) return res.status(400).json({
            success: false,
            statusCode: 400,
            msg: "User no registered"
        });

        if (!(await compare(password, userExisting.password))) {
            return res.status(401).json({
                success: false, statusCode: 401, msg: "Invalid email or password", errors: "Invalid email or password"
            });
        }

        const payload = {
            userID: userExisting.id,
            username: userExisting.username,
            email: userExisting.email,
            bio: userExisting.bio,
            profilePicture: userExisting.profilePicture,
            isVerified: userExisting.isVerified
        }

        const accessToken = await generateToken(payload);
        const refreshToken = await generateRefreshToken(payload);
        res.cookie("accessToken", accessToken, { maxAge: 3600000, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
        res.cookie("refreshToken", refreshToken, { maxAge: 604800000, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" })
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil login",
            data: payload
        });
    } catch (error) {
        handleError(error, res);
    }
}

export const registerController = async (req: Request, res: Response<responseApi>) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await createUserService(email, hashedPassword, username);

        const payload = {
            userID: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
            isVerified: user.isVerified
        }

        const accessToken = await generateToken(payload);
        const refreshToken = await generateRefreshToken(payload);
        res.cookie("accessToken", accessToken, { maxAge: 3600000, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
        res.cookie("refreshToken", refreshToken, { maxAge: 604800000, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" })
        return res.status(201).json({
            success: true, statusCode: 201, msg: "Registered successfully",
            data: payload
        });
    } catch (error) {
        handleError(error, res);
    }
}

export const logoutController = async (req: Request, res: Response<responseApi>) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Logout successfully"
        })
    } catch (error) {
        handleError(error, res)
    }
}

export const refreshTokenController = async (req: Request, res: Response<responseApi>) => {
    try {
        const refreshToken = parseCookie(req.headers.cookie, "refreshToken");

        if (!refreshToken) return res.status(401).json({ success: false, statusCode: 401, msg: "no token" });

        const decode = await verifyRefreshToken(refreshToken);
        const newAccessToken = await generateToken({
            userID: decode.userID,
            username: decode.username,
            bio: decode.bio,
            email: decode.email,
            isVerified: decode.isVerified,
            profilePicture: decode.profilePicture
        });

        res.cookie("accessToken", newAccessToken,
            { maxAge: 3600000, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" }
        );

        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil merefresh akses token"
        })
    } catch (error) {
        return handleError(error, res)
    }
}

export async function getMeInfoController(req: Request, res: Response<responseApi>) {
    try {
        const userLogged = await getUserLogin(req);
        const getInfo = await getMeInfoService(userLogged.userID);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            msg: "Berhasil mendapatkan informasi",
            data: getInfo
        })
    } catch (error) {
        return handleError(error, res);
    }
}