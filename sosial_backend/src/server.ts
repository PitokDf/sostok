import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import morgan from "morgan";
import postRouter from "./routes/posts.routes";
import path from "path";
import followRoute from "./routes/follow.routes";
import compression from "compression"

dotenv.config();

const app = express();

app.use(compression()); // kompresi response json agar lebih kecil
app.use(morgan("dev")); // nampilin log request yang masuk pada console
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json()); // parse request body jadi json

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/follow", followRoute);

const PORT = process.env.PORT || 1212;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});