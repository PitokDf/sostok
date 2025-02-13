import { Loader2, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormEvent, useEffect, useRef, useState } from "react";
import { sendMessage } from "@/lib/api-services";
import { encrypt } from "@/utils/enkripsi";
import api from "@/config/axios.config";
import { removeFromLocaleStorage } from "@/lib/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ChatInput({ selectedChat }: { selectedChat: any }) {
    const [messageInput, setMessageInput] = useState("")
    const queryClient = useQueryClient();
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
            setAttemp(attemp - 1)
            api.post(`/conversations/${selectedChat.conversationID}/typing`)
        }

        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            setAttemp(1);
            api.post(`/conversations/${selectedChat.conversationID}/stop-typing`);
        }, 1500);
    }

    const mutation = useMutation({
        mutationFn: async ({ conversationID, payload }: {
            conversationID: string, payload: {
                content: string,
                receiverID: any
            }
        }) => {
            await sendMessage(conversationID, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["messages", selectedChat.conversationID] })
            sendAudioRef.current?.play()
            setMessageInput("")
            removeFromLocaleStorage("lastSelectedChat")
        },
        onError: (error) => {
            console.log(error);
        }
    })

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault()

        if (!messageInput.trim() || !selectedChat) return;

        mutation.mutate({
            conversationID: selectedChat.conversationID,
            payload: {
                content: encrypt(messageInput),
                receiverID: selectedChat.receiverID
            }
        })
        // try {
        //     setIsSending(true)
        //     await sendMessage(selectedChat.conversationID, { content: encrypt(messageInput), receiverID: selectedChat.receiverID })
        //     sendAudioRef.current?.play()
        //     setMessageInput("")
        //     removeFromLocaleStorage("lastSelectedChat")
        // } catch (error) {
        //     console.log(error);
        // } finally { setIsSending(false) }
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
                <Button type="submit" size="icon" disabled={!messageInput.trim() || mutation.isPending}>
                    {mutation.isPending ? <Loader2 className="animate-spin" /> :
                        <Send className="h-5 w-5" />
                    }
                </Button>
            </div>
        </form>
    );
}