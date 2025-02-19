"use client"

import api from "@/config/axios.config"
import ProfileHeader from "./ProfileHeader"
import ProfileAction from "./ProfileAction"
import ProfileTabs from "./ProfileTabs"
import { useQuery } from "@tanstack/react-query"
import SkeletonProfile from "./Skeleton"

export function ProfileContent({ username }: { username: string }) {
    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return (await api.get(`users/${username}/profile`)).data.data
        }
    })

    if (isLoading) return <SkeletonProfile />

    if (!data) {
        return (
            <div className="container max-w-2xl py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
                <p className="text-muted-foreground">The user you're looking for doesn't exist.</p>
            </div>
        )
    }

    return (
        <div className="px-4 md:px-8 mb-16 container md:max-w-2xl">
            {/* Profile Header */}
            <ProfileHeader profile={data} />

            {/* Profile Action */}
            <ProfileAction profile={data} />

            {/* Posts Grid */}
            <ProfileTabs posts={data.posts} ownProfile={data.isOwnProfile} savedPost={data.savedPost} />
        </div>
    )
}