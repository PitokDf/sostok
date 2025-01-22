import { readFileSync } from "fs"

const private_key = readFileSync("./keys/private_key.pem", "utf8");
const public_key = readFileSync("./keys/public_key.pub", "utf8");

export = {
    privateKey: private_key,
    publicKey: public_key,
    passphrase: process.env.PASSPHRASE,
    accessTokenExpireIn: "1h",
    refreshTokenExpireIn: "7d",
    issuer: "sostok",
    audience: "web-app"
}

