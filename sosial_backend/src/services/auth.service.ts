import { genSalt, hash } from "bcryptjs"
import jwt_config from "../config/jwt_config";
import { JsonWebTokenError, sign, TokenExpiredError, verify } from "jsonwebtoken";
import { AppError } from "../utils/app_error";

export type Payload = {
    userID: number,
    username: string,
    email: string,
    bio: string | null,
    profilePicture: string | null,
    isVerified: boolean,
    exp?: number,

}

export const hashPassword = async (password: any) => {
    const salt = await genSalt(10);
    return await hash(password, salt) as string;
}

export const generateToken = async (payload: Payload) => {
    return sign(payload, { key: jwt_config.privateKey, passphrase: jwt_config.passphrase },
        { expiresIn: jwt_config.accessTokenExpireIn, issuer: jwt_config.issuer, audience: jwt_config.audience, algorithm: "RS256" }
    );
}

export const generateRefreshToken = async (payload: Payload) => {
    return sign(payload, { key: jwt_config.privateKey, passphrase: jwt_config.passphrase },
        { expiresIn: jwt_config.refreshTokenExpireIn, issuer: jwt_config.issuer, audience: jwt_config.audience, algorithm: "RS256" }
    );
}

export const verifyAccessToken = async (token: string) => {
    return new Promise((resolve, reject) => {
        verify(token, jwt_config.publicKey, {
            issuer: jwt_config.issuer,
            audience: jwt_config.audience,
            algorithms: ["RS256"]
        }, (err, decode) => {
            if (err) return reject("Invalid or expire token");
            resolve(decode)
        })
    })
}

export const verifyRefreshToken = async (token: string) => {
    try {
        const decode = verify(token, jwt_config.publicKey,
            { issuer: jwt_config.issuer, audience: jwt_config.audience }
        );
        return decode as Payload;
    } catch (error: any) {
        if (error instanceof TokenExpiredError) {
            throw new AppError("Token has expired", 403);
        } else if (error instanceof JsonWebTokenError) {
            throw new AppError("Invalid token", 401);
        } else {
            throw new AppError("Authentication failed", 403);
        }
    }
}