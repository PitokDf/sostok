import { getFromLocalStorage } from "@/lib/storage";
import { Message } from "@/lib/types";
import { formatHours } from "@/utils/formatTanggal";
import { ChevronDown, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { useState } from "react";
import { decrypt } from "@/utils/enkripsi";
import DeleteMessageButton from "./DeleteMessage";
import EditMessage from "./EditMessage";

export default function MessageBuble({ message }: { message: Message }) {
    const user = getFromLocalStorage('user')
    const [copied, setCopied] = useState(false)
    const handleCopy = async (text: any) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.log(`Failed to copy: ${error}`);
        }
    }
    const isMine = message.isMine === user?.userID
    return (
        <div
            key={message.id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[75%] group px-4 py-2 ${isMine
                    ? "bg-primary text-primary-foreground rounded-l-xl rounded-br-xl"
                    : "bg-muted rounded-r-xl rounded-bl-xl"
                    }`}
            >
                <span className="break-words relative">
                    {decrypt(message.content)}
                    <div className={`cursor-pointer gap-2 flex flex-col group-hover:opacity-90 bg-transparent hover:bg-transparent opacity-0 absolute transition-all bottom-[-2rem] ${isMine ? "left-[-3rem]" : "right-[-3rem]"}`}>
                        {isMine && <EditMessage message={message} />}
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild >
                                <ChevronDown className={`h-6 w-6`} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {isMine && <DeleteMessageButton messageID={message.id} />}
                                <DropdownMenuItem onClick={() => { handleCopy(decrypt(message.content)) }}>
                                    {copied ? 'Copied' : 'Copy'}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </span>
                <p className={`text-[0.7rem] mt-1 ${isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                    {formatHours(message.timestamp)}
                </p>
            </div>
        </div>
    );
}