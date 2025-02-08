import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog"
import { Button } from "./ui/Button"
import { Check, Copy, Facebook, LinkIcon, SquareArrowOutUpLeft, Twitter, X } from "lucide-react"
import { Input } from "./ui/Input"

interface ShareProfileModalProps {
    username: string
}

export function ShareProfileModal({ username }: ShareProfileModalProps) {
    const [copied, setCopied] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const profileUrl = `${window.location.origin}/profile/${username}`

    const handleModal = () => setIsOpen(!isOpen)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (error) {
            console.log(`Failed to copy: ${error}`);
        }
    }

    const handleShare = (platform: string) => {
        const text = `Check out ${username}'s profile on SOSTOK!`
        let url = ""

        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`
                break
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`
                break
        }

        if (url) {
            window.open(url, '_blank', "width=550,height=400")
        }
    }

    return (
        <>
            <Button
                className="w-full flex-1 "
                variant="secondary"
                onClick={handleModal}
                size="sm">
                <SquareArrowOutUpLeft className="mr-2 h-4 w-4" />
                Share Profile
            </Button>
            <Dialog open={isOpen} onOpenChange={handleModal}>
                <DialogContent className="max-w-[425px] h-auto bg-card rounded-lg">
                    <DialogHeader className="flex-row items-center justify-between md:block">
                        <DialogTitle>Share Profile</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 flex-1">
                        <div className="flex space-x-2">
                            <Input
                                value={profileUrl}
                                readOnly
                                className="flex-1"
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopy}
                                className="flex-shrink-0"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        <div className="flex justify-center space-x-4">
                            <Button
                                variant="outline"
                                className="flex-1 hover:bg-[#3b5998] space-x-2 hover:space-x-3 transition-all"
                                onClick={() => handleShare("facebook")}
                            >
                                <Facebook className="h-4 w-4" />
                                <span>Facebook</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 hover:bg-[#000] space-x-2 hover:space-x-3 transition-all"
                                onClick={() => handleShare("twitter")}
                            >
                                <Twitter className="h-4 w-4" />
                                <span>Twitter</span>
                            </Button>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                variant="outline"
                                className="w-full bg-purple-500"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: `${username}'s Profile`,
                                            text: `Check out ${username}'s profile on SOSTOK!`,
                                            url: profileUrl
                                        })
                                    }
                                }}
                            >
                                <LinkIcon className="mr-2 h-4 w-4" />
                                Share via...
                            </Button>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleModal}
                        className="w-full md:hidden mt-4"
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}