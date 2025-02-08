'use client'

import { Post } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Grid, Heart, ImageIcon, MessageCircle } from "lucide-react";
import { Card } from "../ui/Card";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProfileTabs({ posts, ownProfile, savedPost }:
    { posts: Post[], ownProfile: boolean, savedPost: { id: number, imageUrl: string }[] }) {
    const [activeTab, setActiveTab] = useState("posts")
    return (
        <Tabs
            defaultValue="posts"
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
        >
            <TabsList className="w-full bg-transparent p-0 h-auto border-b rounded-none border-border">
                <TabsTrigger
                    value="posts"
                    className={cn(
                        "flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
                        "pb-3 px-2 -mb-[1px] data-[state=active]:text-primary",
                        "hover:bg-transparent hover:text-primary"
                    )}
                >
                    <Grid className="h-4 w-4 mr-2" />
                    Posts
                </TabsTrigger>
                <TabsTrigger
                    value="saved"
                    className={cn(
                        "flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary",
                        "pb-3 px-2 -mb-[1px] data-[state=active]:text-primary",
                        "hover:bg-transparent hover:text-primary"
                    )}
                >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Saved
                </TabsTrigger>
            </TabsList>

            {/* Tambahkan indicator animasi */}
            <div className="relative">
                <div className="absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300"
                    style={{
                        width: `${activeTab === 'posts' ? '50%' : '50%'}`,
                        transform: `translateX(${activeTab === 'posts' ? '0' : '100%'})`
                    }}
                />
            </div>

            {/* Konten tabs tetap sama */}
            <TabsContent value="posts">
                <div className="grid grid-cols-3 gap-[.15rem] md:gap-2">
                    {posts.map((post) => (
                        <Card key={post.id} className="aspect-square rounded-none relative group overflow-hidden">
                            <img
                                src={post.images[0]}
                                alt="post image"
                                loading="lazy"
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white">
                                <div className="flex items-center">
                                    <span className="font-semibold mr-1">{post.likeCount}</span>
                                    <Heart fill="white" className="w-5 h-5" />
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold mr-1">{post.commentCount}</span>
                                    <MessageCircle fill="white" className="w-5 h-5" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="saved">
                <div className="text-center text-muted-foreground">
                    {ownProfile ?
                        savedPost.length > 0 ?
                            <div className="grid grid-cols-3 gap-[.15rem] md:gap-2">{
                                savedPost.map(post => (
                                    <Card key={post.id} className="aspect-square rounded-none overflow-hidden">
                                        <img
                                            loading="lazy"
                                            src={post.imageUrl}
                                            alt={`post save ${post.id}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </Card>
                                ))
                            }
                            </div>
                            : "No saved posts yet"
                        : "Saved posts are private"}
                </div>
            </TabsContent>
        </Tabs>
    );
}