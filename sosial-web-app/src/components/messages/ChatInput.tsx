import { Loader2, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { sendMessage } from "@/lib/api-services";
import { encrypt } from "@/utils/enkripsi";
import api from "@/config/axios.config";

export default function ChatInput({ selectedChat }: { selectedChat: any }) {
    const [messageInput, setMessageInput] = useState("")
    const [isSending, setIsSending] = useState(false)
    const sendAudioRef = useRef<HTMLAudioElement | null>(null)
    const typingTimeout = useRef<NodeJS.Timeout>();
    let [attemp, setAttemp] = useState(1);
    useEffect(() => {
        if (typeof window !== "undefined") {
            sendAudioRef.current = new Audio("/sounds/message-send.mp3")
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (attemp > 0) {
            console.log('typing');
            console.log('attemp: ', attemp);
            setAttemp(attemp - 1)
            api.post(`/conversations/${selectedChat.conversationID}/typing`)
        }

        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            console.log('stop-typing');
            setAttemp(1);
            api.post(`/conversations/${selectedChat.conversationID}/stop-typing`);
        }, 1000);
    }

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault()

        if (!messageInput.trim() || !selectedChat) return;

        try {
            setIsSending(true)
            await sendMessage(selectedChat.conversationID, { content: encrypt(messageInput), receiverID: selectedChat.receiverID })
            sendAudioRef.current?.play()
            setMessageInput("")
        } catch (error) {
            console.log(error);
        } finally { setIsSending(false) }
    }

    return (
        <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
                <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => { setMessageInput(e.target.value); handleInputChange(e) }}
                    className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!messageInput.trim() || isSending}>
                    {isSending ? <Loader2 className="animate-spin" /> :
                        <Send className="h-5 w-5" />
                    }
                </Button>
            </div>
        </form>
    );
}