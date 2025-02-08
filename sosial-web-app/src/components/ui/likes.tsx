"use client"

import api from "@/config/axios.config";
import { useAuth } from "@/context/AuthContext";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LikeUI({ postID, likedBy, className }: { postID: number, likedBy: string[], className?: string }) {

    const { user } = useAuth();
    const router = useRouter();
    const [liked, setLiked] = useState<boolean>(likedBy.includes(user?.username!));
    useEffect(() => { setLiked(likedBy.includes(user?.username!)) }, [user?.username])

    const handleLike = async () => {
        liked ? await api.delete(`/likes/${postID}/unlike`) : await api.post(`/likes/${postID}/like`);
        router.refresh();
        setLiked(!liked)
    }

    return (
        <Heart
            onClick={handleLike}
            fill={liked ? "red" : "none"}
            className={`cursor-pointer ${liked ? "text-red-500" : "text-gray-500"} border-gray-500 hover:text-red-500 ${className}`}
        />
    );
}

export default LikeUI