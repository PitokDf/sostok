import Crypto from "crypto-js"

const secreatKey = "ow+8/+nE9fH4LBTYdifU/xYrMvs="

export const encrypt = (message: string) => {
    return Crypto.AES.encrypt(message, secreatKey).toString()
}

export const decrypt = (encryptMessage: string) => {
    const bytes = Crypto.AES.decrypt(encryptMessage, secreatKey)
    return bytes.toString(Crypto.enc.Utf8)
}