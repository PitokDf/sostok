import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/ScrollArea";
import MessageBuble from "./MessageBuble";
import { Message } from "@/lib/types";

export default function MessageArea({ messages, isLoading }: { messages: Message[], isLoading: boolean }) {
    if (isLoading) return <h1>Loading...</h1>

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
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
    );
}