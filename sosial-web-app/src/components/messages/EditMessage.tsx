import { FormEvent, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Message } from "@/lib/types";
import { Check, Loader2, PencilLine } from "lucide-react";
import { decrypt, encrypt } from "@/utils/enkripsi";
import api from "@/config/axios.config";

export default function EditMessage({ message }: { message: Message }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [messageInput, setMessageInput] = useState(decrypt(message.content))
    const handleModal = () => setIsOpen(!isOpen)

    const handleEditMessage = async (e: FormEvent) => {
        e.preventDefault()
        if (!messageInput.trim()) return
        try {
            setIsLoading(true)
            await api.put(`/messages/${message.id}`, { content: encrypt(messageInput) })
            setIsOpen(false)
        } catch (error) {
            console.log(error);
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <PencilLine
                aria-label="edite message"
                onClick={handleModal}
                className="w-4 h-4 fill-current cursor-pointer hover:bg-transparent hover:text-yellow-600" />
            {isOpen && <Dialog open={isOpen} onOpenChange={handleModal}>
                <DialogContent aria-label="comment content" aria-describedby="edit message" className="sm:max-w-[500px] h-fit bg-card flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Edit Message</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditMessage}>
                        <Input
                            autoFocus={false}
                            onChange={(e) => setMessageInput(e.target.value)}
                            value={messageInput} />
                        <div className="flex justify-end">
                            <Button
                                disabled={!messageInput.trim() || isLoading}
                                size={"icon"}
                                className="w-8 h-8 bg-green-600 disabled:bg-green-800 hover:bg-green-500"
                                type="submit">
                                {isLoading ? <Loader2 className="animate-spin" /> : <Check />}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>}
        </>
    );
}