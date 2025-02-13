import api from "@/config/axios.config";
import { removeFromLocaleStorage } from "@/lib/storage";
import { Button } from "./Button";
import { LogOutIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./Dialog";
import { useState } from "react";

export default function LogoutButton() {
    const [isOpen, setIsOpen] = useState(false)
    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            removeFromLocaleStorage("user");
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const handleModal = () => setIsOpen(!isOpen)
    return (
        <>
            <Button onClick={handleModal} variant={"link"} className="text-current hover:text-red-600">
                <LogOutIcon className="w-5 h-5" />
            </Button>
            <Dialog open={isOpen} onOpenChange={handleModal}>
                <DialogContent className="bg-card">
                    <DialogHeader className="flex-row items-center justify-between md:block">
                        <DialogTitle>Logout?</DialogTitle>
                    </DialogHeader>
                    <div>
                        <p>Yakin ingin keluar?</p>
                        <div className="flex justify-end gap-2">
                            <Button onClick={handleModal} variant={"ghost"} className="bg-gray-600 hover:bg-gray-500" size={"sm"}>Close</Button>
                            <Button onClick={handleLogout} size={"sm"} className="bg-red-600 hover:bg-red-500">Iya</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}