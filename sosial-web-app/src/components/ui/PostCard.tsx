'use client'

import ImageSlider from "../ImageSlider";
import { useState } from "react";
import { MessageCircle, Bookmark } from "lucide-react";
import { formatCaption } from "@/components/posts/format_caption";
import { PostType } from "@/types/post";
import { dateToHuman } from "@/utils/dateToHuman";
import LikeUI from "./likes";
import Image from "next/image";

export default function PostCard({ post }: { post: PostType }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowExpand = post.caption?.length > 100; // Kontrol panjang teks untuk tombol expand
    return (
        <div className="text-black bg-white border space-y-1 w-full mx-auto">
            {/* Header */}
            <div className="px-4 py-1 flex items-center space-x-3">
                <div className="w-12 h-12 overflow-hidden rounded-full">
                    <Image
                        src={post.user.profilePicture || "/images/defaul-profile.png"}
                        alt={`profile photo ${post.user.profilePicture}`}
                        width={35}
                        height={35}
                        className="object-cover w-full h-full"
                    />
                </div>
                <span className="text-base font-semibold">{post.user.username}</span>
            </div>

            {
                post.images.length === 1 ?
                    <div className="object-contain">
                        <img src={`${post.images[0]}?w=500&q=75`} alt="postingan" />
                    </div> :
                    <div className="rounded-md h-auto bg-light flex items-center overflow-hidden">
                        <ImageSlider images={post.images} />
                    </div>
            }

            {/* Actions */}
            <div className="px-4 pt-2 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4 items-center h-max">
                        <LikeUI postID={post.postID} likedBy={post.likedBy}
                            className="hover:scale-110 transition-transform duration-200"
                        />

                        <button
                            aria-label="Comment"
                            className="p-1 hover:scale-110 transition-transform duration-200"
                        >
                            <MessageCircle className="text-gray-500" />
                        </button>
                        {/* <MessageCircle className="cursor-pointer text-gray-500 hover:text-blue-500" /> */}
                    </div>
                    <button
                        aria-label="Save post"
                        className="p-1 hover:scale-110 transition-transform duration-200"
                    >
                        <Bookmark className="text-gray-500" />
                    </button>
                </div>
                <div className="text-sm font-semibold">{post.likeCount} likes</div>
            </div>

            {/* Caption */}
            <div className="px-4 text-sm">
                {post.caption ? (
                    <>
                        <span className="font-semibold">{post.user.username} </span>
                        {isExpanded ? (
                            <span>{formatCaption(post.caption)}</span>
                        ) : (
                            <span>
                                {formatCaption(post.caption.slice(0, 100))}
                                {shouldShowExpand && "..."}
                            </span>
                        )}
                        {shouldShowExpand && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-500 text-sm font-semibold ml-1 hover:underline"
                            >
                                {isExpanded ? "Show less" : "Show more"}
                            </button>
                        )}
                    </>
                ) : (
                    <p className="text-gray-500 italic">No caption</p>
                )}
            </div>

            {/* Timestamp */}
            <div className="px-4 text-xs pb-3 text-gray-400">{dateToHuman(post.uploadAt)}</div>
        </div>
    );
}



