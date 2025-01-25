import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { profileController, updateUserController } from "../controllers/user.controller";
import { userValidator } from "../validators/user_validator";
import { uploadProfileMiddleware } from "../middlewares/upload_profile";

const userRouter = Router();

userRouter.get("/profile", authenticateToken, profileController);
userRouter.get("/:userID/profile", profileController);
userRouter.put("/:userID", authenticateToken, userValidator, updateUserController);
userRouter.post("/:userID/profile-picture", authenticateToken, uploadProfileMiddleware, updateUserController)

export default userRouter;