import { Router } from "express";
import { loginValidator } from "../validators/login_validator";
import { getMeInfoController, loginController, logoutController, registerController } from "../controllers/auth.controller";
import { registerValidator } from "../validators/register_validator";
import { authenticateToken } from "../middlewares/auth_jwt";

const authRouter = Router();

authRouter.post("/login", loginValidator, loginController);
authRouter.post("/register", registerValidator, registerController);
authRouter.post("/logout", logoutController);
authRouter.get("/me", authenticateToken, getMeInfoController);

export default authRouter;