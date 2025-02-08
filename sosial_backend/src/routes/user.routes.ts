import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { getAllUserController, profileController, updateUserController } from "../controllers/user.controller";
import { userValidator } from "../validators/user_validator";
import { uploadProfileMiddleware } from "../middlewares/upload_profile";
import { followUserController, unfollowUserController } from "../controllers/follow.controller";

const userRouter = Router();

userRouter.get("/profile", authenticateToken, profileController);
userRouter.get("/:username/profile", profileController);
userRouter.put("/:userID", authenticateToken, userValidator, updateUserController);
userRouter.post("/:userID/profile-picture", authenticateToken, uploadProfileMiddleware, updateUserController)
userRouter.post("/:userID/follow", authenticateToken, followUserController)
userRouter.delete("/:userID/unfollow", authenticateToken, unfollowUserController)
userRouter.get("/all", getAllUserController)

export default userRouter;