import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import morgan from "morgan";
import postRouter from "./routes/posts.routes";
import path from "path";
import followRoute from "./routes/follow.routes";
import compression from "compression"
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import likeRouter from "./routes/like.routes";
import pusherRoute from "./routes/pusher.routes";
import conversationRoute from "./routes/conversation.routes";
import messageRouter from "./routes/message.routes";


dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}))
app.use(cookieParser()); // untuk parsing cookies pada request
app.use(compression()); // kompresi response json agar lebih kecil
app.use(morgan("dev")); // nampilin log request yang masuk pada console

process.env.NODE_ENV === "development" && app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // parse request body jadi json

app.use("/api/v1/pusher", pusherRoute)
app.use("/api/v1/auth", authRouter); // routing untuk endpoint authentication
app.use("/api/v1/conversations", conversationRoute)
app.use("/api/v1/follow", followRoute); // routing untuk endpoint follows
app.use("/api/v1/likes/", likeRouter); // routing untuk endpoint likes
app.use("/api/v1/messages/", messageRouter); // routing untuk endpoint messages
app.use("/api/v1/posts", postRouter); // routing untuk endpoint posts
app.use("/api/v1/users/", userRouter); // routing untuk endpoint users

const PORT = process.env.PORT || 1212; // ambil port pada file env jika tidak ada default 1212

app.listen(PORT, () => { // running server
    console.log(`server running on port ${PORT}`);
});

export default app;