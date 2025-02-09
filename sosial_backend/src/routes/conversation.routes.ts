import { Router } from "express";
import { authenticateToken } from "../middlewares/auth_jwt";
import { getAllConversationController, initiateConversationController, stopTypingHandler, typingHandler } from "../controllers/conversation.controller";
import { createMessageController, deleteMessageController, getMessageController } from "../controllers/message.controller";

export const conversationRoute = Router()

conversationRoute.get("/", authenticateToken, getAllConversationController)
conversationRoute.post("/initiate", authenticateToken, initiateConversationController)
conversationRoute.get("/:conversationID/message", authenticateToken, getMessageController)
conversationRoute.post("/:conversationID/message", authenticateToken, createMessageController)
conversationRoute.delete("/:conversationID/message/:messageID", authenticateToken, deleteMessageController)
conversationRoute.post("/:conversationID/typing", authenticateToken, typingHandler)
conversationRoute.post("/:conversationID/stop-typing", authenticateToken, stopTypingHandler)

export default conversationRoute
