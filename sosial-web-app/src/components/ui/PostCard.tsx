'use client'

import ImageSlider from "../ImageSlider";
import { useState } from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { formatCaption } from "@/utils/format_caption";
import { PostType } from "@/types";

export default function PostCard({ post }: { post: PostType }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowExpand = post.caption.length > 100; // Kontrol panjang teks untuk tombol expand

    return (
        <div className="text-black bg-white border space-y-1 max-w-[355px] md:max-w-[490px]">
            {/* Header */}
            <div className="px-4 py-2 flex items-center space-x-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                    <img
                        src={post.progileImg}
                        alt={`profile photo ${post.username}`}
                        className="object-cover w-full h-full"
                    />
                </div>
                <span className="text-base font-semibold">{post.username}</span>
            </div>
            {
                post.images.length > 1 ?
                    <div className="object-contain">
                        <img src={post.images[0]} alt="postingan" />
                    </div> :
                    <div className="rounded-md h-auto bg-light flex items-center overflow-hidden">
                        <ImageSlider images={post.images} />
                    </div>
            }

            {/* Image Slider */}


            {/* Actions */}
            <div className="px-4 pt-2 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                        <Heart className="cursor-pointer text-gray-500  hover:text-red-500" />
                        <MessageCircle className="cursor-pointer text-gray-500 hover:text-blue-500" />
                    </div>
                    <Bookmark className="cursor-pointer overflow-hidden text-gray-500 hover:text-blue-500" />
                </div>
                <div className="text-sm font-semibold">{post.likeCount} likes</div>
            </div>

            {/* Caption */}
            <div className="px-4 text-sm">
                <span className="font-semibold">{post.username} </span>
                {isExpanded ? (
                    <span>{formatCaption(post.caption)}</span>
                ) : (
                    <span>
                        {post.caption.slice(0, 100)}
                        {shouldShowExpand && "..."}
                    </span>
                )}
                {shouldShowExpand && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 text-sm font-semibold ml-1"
                    >
                        {isExpanded ? "less" : "more"}
                    </button>
                )}
            </div>

            {/* Timestamp */}
            <div className="px-4 text-xs text-gray-400">2 hours ago</div>

            {/* Add a Comment */}
            <div className="px-4 py-2 border-t">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-transparent text-sm outline-none"
                />
            </div>
        </div>
    );
}



