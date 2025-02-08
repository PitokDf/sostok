'use client'

import api from "@/config/axios.config";
import { useState } from "react";

interface FollowProps {
    isFollowing: boolean;
    userID: number;
    className?: string
}

export default function FollowUI({ isFollowing, userID, className }: FollowProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [followingState, setFollowingState] = useState(isFollowing)

    const handleFollow = async () => {
        try {
            followingState ? await api.delete(`/users/${userID}/unfollow`) : await api.post(`/users/${userID}/follow`);
            setFollowingState(!followingState)
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <button
            onClick={handleFollow}
            className={`w-full px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${followingState
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
                } ${className}`}
        >
            {followingState ? 'Unfollow' : 'Follow'}
        </button>
    );
}