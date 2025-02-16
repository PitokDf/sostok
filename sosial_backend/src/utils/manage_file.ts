import multer, { diskStorage } from "multer";
import path from "path";
import { getUserLogin } from "./session";
import { exists, unlink } from "fs";

export const fileUploader =
    (destination: string, allowedFileType: Array<string>, maxFileSize: number) => {
        // set storage engine
        const storage = diskStorage({
            destination: process.env.NODE_ENV === "production" ? `/tmp/${destination}` : `./public/${destination}`,
            filename: (req, file, cb) => {
                const username = getUserLogin(req).username
                cb(null, username + "-" + Date.now() + "." + file.mimetype.replace("image/", ""))
            },
        });

        // check file type
        const checkfileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
            const fileTypes = new RegExp(allowedFileType.join("|"), 'i');
            const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = fileTypes.test(file.mimetype);

            if (extname && mimetype) {
                return cb(null, true)
            } else {
                cb(new Error(`Only ${allowedFileType.join(', ')} files are allowed!`))
            }
        }

        return multer({
            storage: storage,
            fileFilter: (req, file, cb) => {
                checkfileType(file, cb);
            },
            limits: { fileSize: maxFileSize },
        })
    };

export const deleteFile = (filePath: string) => {
    const fullPath = path.resolve(__dirname, "../../public", filePath);

    exists(fullPath, exists => {
        if (!exists) {
            console.log("no file found");
        }

        unlink(fullPath, err => {
            console.log(err);
        })
    })
}