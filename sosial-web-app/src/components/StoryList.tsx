'use client'

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Story } from "@/lib/types";
import { storyData } from "@/lib/data";
import StoryModal from "./StoryModal";

export default function StoryList() {
    const [stories, setStories] = useState<Story[]>(storyData)
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null)

    stories.length === 0 && useEffect(() => { alert("load") }, [])

    // const 

    if (!stories) return (
        <h1>Loading...</h1>
    )

    return (
        <div className="mb-6 flex space-x-4 overflow-x-auto no-scrollbar pb-4">
            <div className="flex flex-col items-center space-y-1">
                <Link href={"/create/story"}>
                    <div className="rounded-full p-1 bg-muted hover:bg-muted/80 transition-colors">
                        <Avatar className="h-14 w-14 md:h-16 md:w-16 bg-background">
                            <Plus className="h-6 w-6" />
                        </Avatar>
                    </div>
                    <span className="text-xs md:text-sm">Add Story</span>
                </Link>
            </div>
            {stories?.map((story, index) => {
                return (
                    <div
                        onClick={() => setSelectedStoryIndex(index)}
                        key={story.id}
                        className="flex flex-col items-center space-y-1 cursor-pointer group"
                    >
                        <div
                            className="rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-purple-600 group-hover:from-yellow-500 group-hover:to-purple-700 transition-all">
                            <Avatar className="h-14 w-14 md:h-16 md:w-16 ring-2  ring-background">
                                <AvatarImage src={story.user?.profilePicture} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </div>
                        <span className="text-xs md:text-sm">{story.user?.username}</span>
                    </div>
                )
            })}

            {selectedStoryIndex !== null && (
                <StoryModal
                    stories={stories}
                    initialStoryIndex={selectedStoryIndex}
                    isOpen={true}
                    onClose={() => setSelectedStoryIndex(null)}
                />
            )}
        </div>
    );
}