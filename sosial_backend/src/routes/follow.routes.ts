import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { followValidator } from "../validators/follow_validator";
import { followUserController, unfollowUserController } from "../controllers/follow_controller";

const followRoute = Router();

followRoute.post("/", authenticateToken, followValidator, followUserController);
followRoute.delete("/", authenticateToken, followValidator, unfollowUserController);

export default followRoute;