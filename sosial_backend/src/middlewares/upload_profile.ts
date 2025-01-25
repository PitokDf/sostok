import { NextFunction, Request, Response } from "express";
import { fileUploader } from "../utils/manage_file";
import { MulterError } from "multer";

const destination = "profiles";
const fileSize = 2500000;
const uploadProfile = fileUploader(destination, ["jpeg", "jpg", "png"], fileSize).single("profileImage");

export const uploadProfileMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    uploadProfile(req, res, error => {
        if (error) {
            let errorMessage = "failed upload image";
            if (error instanceof MulterError) {
                if (error.code === "LIMIT_FILE_SIZE") errorMessage = `File size exceeds the limit of ${fileSize / (1024 * 1024)}MB`
            } else {
                errorMessage = error.message
            }

            return res.status(400).json({
                success: false,
                statusCode: 400,
                msg: errorMessage
            });
        }

        if (req.files?.length == 0 && !req.file) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                msg: "No file selected!"
            });
        }
        next();
    })
}