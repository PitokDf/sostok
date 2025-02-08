'use client'

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/Input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Send, Phone, Video, X, Search, MoreVertical, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { usePusherChannel } from "@/hooks/usePusherChanel"
import api from "@/config/axios.config"
import { ListConversation, Message } from "@/lib/types"
import MessageBuble from "@/components/messages/MessageBuble"
import ChatListItem from "@/components/messages/ChatListItem"
import { getConversationList, sendMessage } from "@/lib/api-services"
import ProfilePicture from "@/components/ProfilePicture"
import { getFromLocalStorage, removeFromLocaleStorage, storeToLocalStorage } from "@/lib/storage"
import { encrypt } from "@/utils/enkripsi"

export default function MessagesPage() {
    const user = getFromLocalStorage('user')
    const initiateConversation = getFromLocalStorage("selectedChat")

    const [listConversations, setListConversations] = useState<ListConversation[]>([])
    const [selectedChat, setSelectedChat] = useState<any>(initiateConversation ?? null)
    const [messageInput, setMessageInput] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [isMobileListVisible, setIsMobileListVisible] = useState(initiateConversation ? false : true)
    const [messages, setMessages] = useState<Message[]>([])
    const [isSending, setIsSending] = useState(false)

    // const notificationdAudioRef = useRef<HTMLAudioElement>(new Audio('/sounds/message-notification.mp3'))

    const fetchConversation = async () => {
        const res = await getConversationList();
        setListConversations(res.data)
    }
    const fetchMessage = async (conversationID: string) => {
        const res = await api.get(`/conversations/${conversationID}/message`)
        setMessages(res.data.data)
    }

    useEffect(() => {
        fetchConversation()
        document.title = "Chats - Sostok"
    }, [])

    useEffect(() => {
        if (!selectedChat) return;
        fetchMessage(selectedChat.conversationID);
    }, [selectedChat])

    const messagesEndRef = useRef<HTMLDivElement>(null)

    usePusherChannel(selectedChat ? `chat-${selectedChat.conversationID}` : '', 'delete-message', (data: Message) => {
        fetchConversation()
        setMessages(messages.filter(msg => msg.id !== data.id))
    })

    usePusherChannel(selectedChat ? `chat-${selectedChat.conversationID}` : '', 'new-message', (data: Message) => {
        fetchConversation()
        // useRef<HTMLAudioElement>(new Audio('/sounds/message-notification.mp3')).current.play().then().catch(error => console.log(error))
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

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!messageInput.trim() || !selectedChat) return;

        try {
            setIsSending(true)
            await sendMessage(selectedChat.conversationID, { content: encrypt(messageInput), receiverID: selectedChat.receiverID })
            // useRef<HTMLAudioElement>(new Audio('/sounds/message-send.mp3')).current.play().then().catch(error => console.log(error))
            removeFromLocaleStorage('selectedChat')
            setMessageInput("")
        } catch (error) {
            console.log(error);
        } finally { setIsSending(false) }

    }

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
                            <div className="p-4 border-b flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="lg:hidden"
                                        onClick={toggleMobileView}
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                    <div className="relative">
                                        <ProfilePicture user={{ username: selectedChat.username, profilePicture: selectedChat.avatar }} />
                                        {selectedChat.online && (
                                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-background" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{selectedChat.username}</p>
                                        {selectedChat.online && (
                                            <p className="text-xs text-muted-foreground">Online</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                                        <Phone className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                                        <Video className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages */}
                            <ScrollArea className="flex-1 p-4 max-h-[calc(100vh-16rem)] h-full max-w-[99vw] md:max-h-[calc(100vh-16rem)]">
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <MessageBuble key={message.id} message={message} conversationID={selectedChat.conversationID} />
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Message Input */}
                            <form onSubmit={handleSendMessage} className="p-4 border-t">
                                <div className="flex space-x-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button type="submit" size="icon" disabled={!messageInput.trim() || isSending}>
                                        {isSending ? <Loader2 className="animate-spin" /> :
                                            <Send className="h-5 w-5" />
                                        }
                                    </Button>
                                </div>
                            </form>
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