import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { deleteMessageController, editMessageController } from "../controllers/message.controller";

const messageRouter = Router()

messageRouter.delete("/:messageID", authenticateToken, deleteMessageController)
messageRouter.put("/:messageID", authenticateToken, editMessageController)

export default messageRouter