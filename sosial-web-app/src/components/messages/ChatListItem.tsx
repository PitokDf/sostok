import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { formatHours } from "@/utils/formatTanggal";
import ProfilePicture from "../ProfilePicture";
import { storeToLocalStorage } from "@/lib/storage";
import { decrypt } from "@/utils/enkripsi";

type ChatListItemProps = {
    chat: {
        avatar: string;
        username: string;
        timeStamp: string;
        conversationID: string;
        lastMessage: string;
    },
    selectedChat: string,
    setSelectedChat: (chat: any) => void,
    setIsMobileListVisible: (visible: boolean) => void
}

export default function ChatListItem({ chat, setIsMobileListVisible, setSelectedChat }: ChatListItemProps) {
    let lastMessage = chat.lastMessage && decrypt(chat.lastMessage?.replace('Anda: ', ""))
    if (chat.lastMessage?.startsWith('Anda: ')) {
        lastMessage = "Anda: " + lastMessage
    }
    return (
        <div
            key={chat.conversationID}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted
                }`}
        >
            <div className="relative flex-shrink-0 z-50">
                <ProfilePicture user={{ username: chat.username, profilePicture: chat.avatar }} />
            </div>
            <div className="flex-1 min-w-0" onClick={() => {
                storeToLocalStorage('lastSelectedMessage', chat)
                setSelectedChat(chat)
                setIsMobileListVisible(false)
            }}>
                <div className="flex justify-between items-start">
                    <p className="font-semibold truncate">{chat.username}</p>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{!chat.lastMessage ? "" : formatHours(chat.timeStamp)}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{!chat.lastMessage ? "Start chating" : lastMessage?.length > 40 ? `${lastMessage.slice(0, 39)}...` : lastMessage}</p>
            </div>
        </div>
    );
}