import { Router } from "express";
import { loginValidator } from "../validators/login_validator";
import { loginController, logoutController, refreshTokenController, registerController } from "../controllers/auth_controller";
import { registerValidator } from "../validators/register_validator";

const authRouter = Router();

authRouter.post("/login", loginValidator, loginController);
authRouter.post("/register", registerValidator, registerController);
authRouter.post("/logout", logoutController);
authRouter.get("/refresh-token", refreshTokenController);

export default authRouter;