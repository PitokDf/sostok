'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Search } from "lucide-react"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { usePusherChannel } from "@/hooks/usePusherChanel"
import api from "@/config/axios.config"
import { ListConversation, Message } from "@/lib/types"
import ChatListItem from "@/components/messages/ChatListItem"
import { getConversationList } from "@/lib/api-services"
import { getFromLocalStorage } from "@/lib/storage"
import ChatInput from "@/components/messages/ChatInput"
import ChatHeader from "@/components/messages/ChatHeader"
import MessageArea from "@/components/messages/MessageArea"

export default function MessagesPage() {
    const user = getFromLocalStorage('user')
    const initiateConversation = getFromLocalStorage("selectedChat")
    const [listConversations, setListConversations] = useState<ListConversation[]>([])
    const [selectedChat, setSelectedChat] = useState<any>(initiateConversation ?? null)
    const [searchQuery, setSearchQuery] = useState("")
    const [isMobileListVisible, setIsMobileListVisible] = useState(initiateConversation ? false : true)
    const [messages, setMessages] = useState<Message[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null)
    let notificationAudioRef = useRef<HTMLAudioElement | null>(null);

    const fetchConversation = async () => {
        const res = await getConversationList();
        setListConversations(res.data)
    }
    const fetchMessage = async (conversationID: string) => {
        const res = await api.get(`/conversations/${conversationID}/message`)
        setMessages(res.data.data)
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            fetchConversation()
            document.title = "Chats - Sostok"
            notificationAudioRef.current = new Audio("/sounds/message-notification.mp3")
        }
    }, [])

    useEffect(() => {
        if (!selectedChat) return;
        fetchMessage(selectedChat.conversationID);
    }, [selectedChat])


    usePusherChannel<Message>(selectedChat ? `chat-${selectedChat.conversationID}` : '', 'delete-message', (data: Message) => {
        fetchConversation()
        setMessages(messages.filter(msg => msg.id !== data.id))
    })

    usePusherChannel<Message>(selectedChat ? `chat-${selectedChat.conversationID}` : '', 'edit-message', (data: Message) => {
        fetchConversation()
        setMessages(prev => prev.map(msg =>
            msg.id == data.id ? { ...msg, content: data.content } : msg
        ))
        // fetchMessage(selectedChat.conversationID)
    })

    usePusherChannel<Message>(selectedChat ? `chat-${selectedChat.conversationID}` : '', 'new-message', (data: Message) => {
        fetchConversation()
        user.userID !== data.isMine && notificationAudioRef.current?.play()
        setMessages(prev => [
            ...prev, data
        ])
    })

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])

    // Handle resize events
    useEffect(() => {
        window.addEventListener('resize', scrollToBottom);
        return () => window.removeEventListener('resize', scrollToBottom);
    }, [scrollToBottom]);

    const filteredChats = listConversations!.filter(chat =>
        chat.username.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const toggleMobileView = () => {
        setIsMobileListVisible(!isMobileListVisible)
    }

    return (
        <div className="container max-h-full md:max-h-[800px] h-[calc(100vh-8rem)] md:py-4">
            <div className="grid lg:grid-cols-[350px_1fr] h-full gap-4">
                {/* Chat List */}
                <Card className={`p-4 overflow-hidden rounded-none md:rounded-md max-h-full flex flex-col  ${isMobileListVisible ? 'block' : 'hidden'
                    } lg:block`}>
                    <div className="space-y-4">
                        <h2 className="font-semibold text-xl">Messages</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search messages..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <ScrollArea className="flex-1 -mx-2 px-2 mt-4">
                        <div className="space-y-2">
                            {filteredChats.map((chat) => (
                                <ChatListItem
                                    key={chat.conversationID}
                                    chat={chat as any}
                                    selectedChat={chat.conversationID}
                                    setIsMobileListVisible={setIsMobileListVisible}
                                    setSelectedChat={setSelectedChat} />
                            ))}
                        </div>
                    </ScrollArea>
                </Card>

                {/* Chat Area */}
                <Card className={`flex flex-col rounded-none md:rounded-md h-full md:max-h-[800px] ${isMobileListVisible ? 'hidden' : 'flex'
                    } lg:flex`}>
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <ChatHeader selectedChat={selectedChat} toggleMobileView={toggleMobileView} />
                            <MessageArea messages={messages} />
                            <ChatInput selectedChat={selectedChat} />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <div className="max-w-sm">
                                <h3 className="text-xl font-semibold mb-2">No Chat Selected</h3>
                                <p className="text-muted-foreground">
                                    Choose a conversation from the list to start messaging
                                </p>
                                <Button
                                    variant="ghost"
                                    onClick={toggleMobileView}
                                    className="mt-4 lg:hidden"
                                >
                                    View Conversations
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}