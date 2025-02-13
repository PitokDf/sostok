import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { createPostController, deletePostController, getAllPostController, getPostByIdController, getPostUserController, updatePostController } from "../controllers/post.controller";
import { uploadPostImageMiddleware } from "../middlewares/upload_image_post";
import { createCommentController, deleteCommentController, getCommentController } from "../controllers/comment.controller";
import { savePostinganController, unSavePostinganController } from "../controllers/save_post.controller";
import multer from "multer";
import { uploadFileToDrive } from "../utils/upload_to_drive";

const postRouter = Router();
const upload = multer({ storage: multer.memoryStorage() })

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

postRouter.post("/test", upload.single('file'), async (req, res) => {
    try {
        const fileID = await uploadFileToDrive(req.file!)
        return res.send(`File berhasil diupload, file id: ${fileID}`)
    } catch (error) {
        return res.status(500).send('Ada error')
    }
})
export default postRouter;