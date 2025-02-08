import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { createPostController, deletePostController, getAllPostController, getPostByIdController, getPostUserController, updatePostController } from "../controllers/post.controller";
import { uploadPostImageMiddleware } from "../middlewares/upload_image_post";
import { createCommentController, deleteCommentController, getCommentController } from "../controllers/comment.controller";
import { savePostinganController, unSavePostinganController } from "../controllers/save_post.controller";

const postRouter = Router();

postRouter.post("/", authenticateToken, uploadPostImageMiddleware, createPostController);
postRouter.get("/users/me", authenticateToken, getPostUserController);
postRouter.get("/users/beranda", authenticateToken, getAllPostController);
postRouter.get("/users/:userId/posts", authenticateToken, getPostUserController);
postRouter.get("/:postID", authenticateToken, getPostByIdController);
postRouter.delete("/:postID", authenticateToken, deletePostController);
postRouter.put("/:postID", authenticateToken, updatePostController);

postRouter.get("/:postID/comments", authenticateToken, getCommentController)
postRouter.post("/:postID/comments", authenticateToken, createCommentController)
postRouter.delete("/:commentID/comments", authenticateToken, deleteCommentController)

postRouter.post("/:postID/save", authenticateToken, savePostinganController)
postRouter.delete("/:postID/unsave", authenticateToken, unSavePostinganController)
export default postRouter;