import { Router } from "express";
import { loginValidator } from "../validators/loginValidator";
import { loginController } from "../controllers/authControllers";

const authRouter = Router();

authRouter.post("/login", loginValidator, loginController);

export default authRouter;