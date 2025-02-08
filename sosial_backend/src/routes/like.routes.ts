import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { likePostController, unLikePostController } from "../controllers/like.controller";

const likeRouter = Router();

likeRouter.delete("/:postID/unlike", authenticateToken, unLikePostController)
likeRouter.post("/:postID/like", authenticateToken, likePostController)

export default likeRouter;