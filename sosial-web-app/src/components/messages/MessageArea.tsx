import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/ScrollArea";
import MessageBuble from "./MessageBuble";
import { Message } from "@/lib/types";
import "./style.css"
import { getFromLocalStorage } from "@/lib/storage";
import { usePusherChannel } from "@/hooks/usePusherChanel";

export default function MessageArea({ messages, isLoading, selectedChat }: { messages: Message[], isLoading: boolean, selectedChat: any }) {
    if (isLoading) return <h1>Loading...</h1>

    const user = getFromLocalStorage('user')
    const [typing, setIsTyping] = useState(false)

    usePusherChannel<{ userID: string }>(`chats-${selectedChat.conversationID}`, 'typing', ({ userID }) => {
        if (userID !== user.userID) { setIsTyping(true); }
    }
    );

    usePusherChannel<{ userID: string }>(`chats-${selectedChat.conversationID}`, 'stop-typing',
        ({ userID }) => {
            if (userID !== user.userID) { setIsTyping(false); }
        }
    );

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        })
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    return (
        <ScrollArea className="flex-1 p-4 max-h-[calc(100vh-16rem)] h-full max-w-[99vw] md:max-h-[calc(100vh-16rem)]">
            <div className="space-y-4">
                {messages.map((message) => (
                    <MessageBuble key={message.id} message={message} />
                ))}
                {typing &&
                    <div className="bg-muted group px-4 pt-4 pb-2 w-max rounded-r-xl rounded-bl-xl flex items-center space-x-1">
                        <span className="dot bg-current w-1 h-1 rounded-full"></span>
                        <span className="dot bg-current w-1 h-1 rounded-full"></span>
                        <span className="dot bg-current w-1 h-1 rounded-full"></span>
                    </div>
                }
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    );
}