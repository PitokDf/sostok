import { Router } from "express";

const postRouter = Router();

postRouter.get("/", (req, res) => {
    res.status(201).json("hello")
})

export default postRouter;