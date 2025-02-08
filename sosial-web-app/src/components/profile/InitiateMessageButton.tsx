import { MessageCircle } from "lucide-react";
import { Button } from "../ui/Button";
import api from "@/config/axios.config";
import { storeToLocalStorage } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function InitiateMessageButton({ targetID }: { targetID: number }) {
    const router = useRouter()
    const handleIniateMessage = async () => {
        try {
            const res = await api.post('/conversations/initiate', { targetUserID: targetID })
            storeToLocalStorage('selectedChat', res.data.data)

            router.push("/messages")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button
            className="w-full flex-1"
            size={"sm"}
            onClick={handleIniateMessage}
        >
            <MessageCircle className="mr-2 w-4 h-4" />
            Message
        </Button>
    );
}