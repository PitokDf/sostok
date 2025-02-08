import api from "@/config/axios.config";
import { Post } from "@/lib/types";
import { formatCaption } from "@/components/posts/format_caption";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import CommentModal from "./CommentModal";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { getFromLocalStorage } from "@/lib/storage";

export default function PostAction({ post }: { post: Post }) {
    const user = getFromLocalStorage('user')
    const [isLiked, setLiked] = useState<boolean>(false);
    const [isSave, setIsSave] = useState<boolean>(post.saveBy.includes(user?.username!))
    const [likeCount, setLikeCount] = useState<number>(post.likeCount)
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedPostID, setSelectedPostID] = useState<number | null>(null)
    const shouldShowExpand = post.caption?.length! > 100;

    useEffect(() => { setLiked(post.likedBy.includes(user?.username!)) }, [user])
    const handleLike = async () => {
        if (isLiked) {
            await api.delete(`/likes/${post.postID}/unlike`)
            setLikeCount(likeCount - 1)
        } else {
            await api.post(`/likes/${post.postID}/like`)
            setLikeCount(likeCount + 1)
        };
        setLiked(!isLiked)
    }

    const handleSavePost = async () => {
        if (isSave) {
            await api.delete(`/posts/${post.postID}/unsave`)
            setIsSave(!isSave);
        } else {
            await api.post(`/posts/${post.postID}/save`)
            setIsSave(!isSave);
        }
    }

    return (
        <div className="p-3 md:p-4 space-y-2 md:space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="flex items-center gap-2">
                        <Heart
                            onClick={handleLike}
                            className={`h-5 w-5 ${isLiked && "text-red-500 hover:text-red-600"}  md:h-6 md:w-6 hover:text-red-500 cursor-pointer transition-all hover:scale-110 hover:fill-current`}
                            fill={isLiked ? "currentColor" : "none"}
                        />
                        <p className="font-semibold text-sm md:text-base">
                            {likeCount > 0 && likeCount}
                        </p>
                    </div>
                    <MessageCircle
                        onClick={() => setSelectedPostID(post.postID)}
                        className="h-5 w-5 md:h-6 md:w-6 hover:fill-current cursor-pointer transition-all duration-100" />
                </div>
                <Bookmark onClick={handleSavePost} className={`h-5 w-5 md:h-6 md:w-6 ${isSave && "text-yellow-500 fill-current"} cursor-pointer transition-all hover:scale-110 hover:text-yellow-500 hover:fill-current`} />
            </div>
            {likeCount > 0 &&
                <p>Liked by {post.likedBy[0]} {post.likedBy.length > 1 && " and others"}</p>
            }
            {post.caption && (
                <p className="text-sm md:text-base">
                    <span className="font-semibold">{post.user.username}</span>
                    {" "}
                    {isExpanded ? (
                        <span>{formatCaption(post.caption)}</span>
                    ) : (
                        <span>{formatCaption(post.caption.slice(0, 100))}{shouldShowExpand && "..."}</span>
                    )}
                    {" "}
                    {shouldShowExpand &&
                        <button className="text-gray-400" onClick={() => setIsExpanded(!isExpanded)}>
                            {!isExpanded ? "more" : "less"}
                        </button>
                    }
                </p>
            )}
            {selectedPostID !== null && (
                <CommentModal
                    postID={post.postID}
                    isOpen={true}
                    onClose={() => setSelectedPostID(null)}
                />
            )}
        </div>
    );
}