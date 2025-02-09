import { MoreVertical, Phone, Video, X } from "lucide-react";
import { Button } from "../ui/Button";
import ProfilePicture from "../ProfilePicture";
import { getFromLocalStorage } from "@/lib/storage";
import { useState } from "react";
import { usePusherChannel } from "@/hooks/usePusherChanel";

export default function ChatHeader({ toggleMobileView, selectedChat }: { toggleMobileView: (visible: boolean) => void, selectedChat: any }) {
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
    return (
        <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => toggleMobileView(false)}
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
                    <p className="font-semibold transition-all">{selectedChat.username}</p>
                    {typing && <p className="text-xs text-muted-foreground">Mengetik...</p>}
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
    );
}