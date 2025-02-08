import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { getAllConversationController, initiateConversationController } from "../controllers/conversation.controller";
import { createMessageController, deleteMessageController, getMessageController } from "../controllers/message.controller";

export const conversationRoute = Router()

conversationRoute.get("/", authenticateToken, getAllConversationController)
conversationRoute.post("/initiate", authenticateToken, initiateConversationController)
conversationRoute.get("/:conversationID/message", authenticateToken, getMessageController)
conversationRoute.post("/:conversationID/message", authenticateToken, createMessageController)
conversationRoute.delete("/:conversationID/message/:messageID", authenticateToken, deleteMessageController)

export default conversationRoute
