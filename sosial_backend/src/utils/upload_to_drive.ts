import { google } from "googleapis";
import { Readable } from "stream";

const auth = new google.auth.GoogleAuth({
    keyFile: "account-service.json",
    scopes: ['https://www.googleapis.com/auth/drive']
})

const drive = google.drive({
    version: "v3",
    auth
})

/**
 * Fungsi untuk upload file ke google drive dari memory
 * @param {Object} file - object file dari multer dengan memory storage
 * @returns {Promise<string>} - mengembalikan file ID dari Google Drive
*/

export const uploadFileToDrive = async (file: Express.Multer.File) => {
    try {
        const bufferStream = new Readable()
        bufferStream.push(file.buffer)
        bufferStream.push(null)

        const metadata = {
            name: file.originalname,
            parents: ["1YrpJ_VKvRqRqtMS2yNdFjwfKWt2S1PVa"]
        }

        const media = {
            mimeType: file.mimetype,
            body: bufferStream
        }

        const res = await drive.files.create({
            requestBody: metadata,
            media: media,
            fields: 'id',
        })

        await drive.permissions.create({ fileId: res.data.id!, requestBody: { role: "reader", type: "anyone" } })

        return res.data.id;
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteFileFromDrive = async (fileID: string) => {
    try {
        await drive.files.delete({ fileId: fileID })
        return true
    } catch (error) {
        console.log(error);
        throw error
    }
}