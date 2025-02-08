'use client'

import { Story } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { ChevronLeft, ChevronRight, Heart, Send, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/Dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Input } from "./ui/Input";

interface StoryModalProps {
    stories: Story[]
    initialStoryIndex: number
    isOpen: boolean
    onClose: () => void
}

export default function StoryModal({ stories, initialStoryIndex, isOpen, onClose }: StoryModalProps) {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [message, setMessage] = useState("")

    const currentStory = stories[currentStoryIndex]
    const totalImages = currentStory?.imageUrls.length || 0

    useEffect(() => {
        setProgress(0)
        setCurrentImageIndex(0)
    }, [currentStoryIndex])


    useEffect(() => {
        if (!isOpen || isPaused) return

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    // If there are more images in the current story
                    if (currentImageIndex < totalImages - 1) {
                        setCurrentImageIndex(prev => prev + 1)
                        return 0
                    }
                    // If there are more stories
                    else if (currentStoryIndex < stories.length - 1) {
                        setCurrentStoryIndex(prev => prev + 1)
                        return 0
                    } else {
                        onClose()
                        return prev
                    }
                }
                return prev + 1
            })
        }, 30) // 3 seconds total duration

        return () => clearInterval(timer)
    }, [isOpen, currentStoryIndex, currentImageIndex, stories.length, onClose, isPaused, totalImages])


    const handlePrevious = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1)
            setProgress(0)
        } else if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1)
            setCurrentImageIndex(stories[currentStoryIndex - 1].imageUrls.length - 1)
            setProgress(0)
        }
    }

    const handleNext = () => {
        if (currentImageIndex < totalImages - 1) {
            setCurrentImageIndex(currentImageIndex + 1)
            setProgress(0)
        } else if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1)
            setProgress(0)
        } else {
            onClose()
        }
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim()) return
        // Here you would handle sending the message
        setMessage("")
    }

    if (!currentStory) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl h-[80vh] p-0">
                <VisuallyHidden>
                    <DialogTitle>Story Viewer</DialogTitle>
                </VisuallyHidden>
                <div className="relative h-full flex flex-col"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}>
                    {/* Progress bars */}
                    <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
                        {currentStory.imageUrls.map((_, index) => (
                            <div key={index} className="h-0.5 flex-1 bg-white/30 overflow-hidden">
                                <div
                                    className="h-full bg-white transition-all duration-30"
                                    style={{
                                        width: index < currentImageIndex ? "100%" :
                                            index === currentImageIndex ? `${progress}%` : "0%"
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8 ring-2 ring-primary">
                                <AvatarImage src={currentStory.user?.profilePicture} />
                                <AvatarFallback>{currentStory.user?.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="font-semibold text-white">{currentStory.user?.username}</span>
                                <p className="text-xs text-white/80">
                                    {new Date(currentStory.createdAt!).toLocaleDateString(undefined, {
                                        hour: 'numeric',
                                        minute: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20"
                                onClick={() => setIsPaused(!isPaused)}
                            >
                                {isPaused ? "▶️" : "⏸️"}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20"
                                onClick={onClose}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Story content */}
                    <div className="relative flex-1 bg-black">
                        <img
                            src={currentStory.imageUrls[currentImageIndex]}
                            alt=""
                            className="absolute inset-0 w-full h-full object-contain"
                        />

                        {/* Navigation buttons */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                            onClick={handlePrevious}
                            disabled={currentStoryIndex === 0 && currentImageIndex === 0}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                            onClick={handleNext}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </Button>

                        {/* Actions */}
                        <form
                            onSubmit={handleSendMessage}
                            className="absolute bottom-4 left-4 right-4 flex items-center space-x-4"
                        >
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Send message..."
                                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20"
                            >
                                <Heart className="h-6 w-6" />
                            </Button>
                            <Button
                                type="submit"
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/20"
                                disabled={!message.trim()}
                            >
                                <Send className="h-6 w-6" />
                            </Button>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}