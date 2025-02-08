import { Router } from "express";
import { pusherAuthController } from "../controllers/pusher.controller";
import { authenticateToken } from "../middlewares/auth_jwt";

const pusherRoute = Router()

pusherRoute.post("/auth", authenticateToken, pusherAuthController)

export default pusherRoute