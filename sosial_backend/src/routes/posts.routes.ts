import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { createPostController, deletePostController, getAllPostController, getPostByIdController, getPostUserController, updatePostController } from "../controllers/post_controller";
import { uploadPostImageMiddleware } from "../middlewares/upload_image_post";

const postRouter = Router();

postRouter.post("/", authenticateToken, uploadPostImageMiddleware, createPostController);
postRouter.get("/users/me", authenticateToken, getPostUserController);
postRouter.get("/users/beranda", authenticateToken, getAllPostController);
postRouter.get("/users/:userId/posts", authenticateToken, getPostUserController);
postRouter.get("/:postID", authenticateToken, getPostByIdController);
postRouter.delete("/:postID", authenticateToken, deletePostController);
postRouter.put("/:postID", authenticateToken, updatePostController);

export default postRouter;