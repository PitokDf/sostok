import { getFromLocalStorage } from "@/lib/storage";
import { Message } from "@/lib/types";
import { formatHours } from "@/utils/formatTanggal";
import { ChevronDown, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { useState } from "react";
import { decrypt } from "@/utils/enkripsi";
import DeleteMessageButton from "./DeleteMessage";

export default function MessageBuble({ message, conversationID }: { message: Message, conversationID: string }) {
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
                <p className="break-words relative">
                    {decrypt(message.content)}

                    <DropdownMenu >
                        <DropdownMenuTrigger asChild className={`cursor-pointer group-hover:opacity-90 bg-transparent hover:bg-transparent opacity-0 absolute transition-all bottom-[-1rem] ${isMine ? "left-[-3rem]" : "right-[-3rem]"}`}>
                            <Button variant={"ghost"} size={'icon'} className="h-8 w-8">
                                <ChevronDown className={``} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {isMine && <DeleteMessageButton conversationID={conversationID} messageID={message.id} />}
                            <DropdownMenuItem onClick={() => { handleCopy(decrypt(message.content)) }}>
                                {copied ? 'Copied' : 'Copy'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </p>
                <p className={`text-[0.7rem] mt-1 ${isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                    {formatHours(message.timestamp)}
                </p>
            </div>
        </div>
    );
}