import express from "express";
import os from 'os';
import dotenv from "dotenv";
import postRouter from "./routes/post.routes";
import authRouter from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 2003;

const getLocalIP = () => {
    const networkInterfaces = os.networkInterfaces();
    let localIP = 'localhost';

    for (const interfaceKey in networkInterfaces) {
        for (const interfaceDetails of networkInterfaces[interfaceKey]!) {
            if (interfaceDetails.family === 'IPv4' && !interfaceDetails.internal) {
                localIP = interfaceDetails.address;
                break;
            }
        }
    }

    return localIP;
};


app.use("/api/v1/auth/", authRouter)
app.use("/api/v1/posts/", postRouter);


const localIP = getLocalIP();
console.log(`Server is running on http://localhost:${PORT}`);
localIP !== "localhost" && console.log(`Server is running on http://${localIP}:${PORT}`);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});