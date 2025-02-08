"use client"

import { useState, useEffect } from "react"
import api from "@/config/axios.config"
import { Profile } from "@/lib/types"
import ProfileHeader from "./ProfileHeader"
import ProfileAction from "./ProfileAction"
import ProfileTabs from "./ProfileTabs"

export function ProfileContent({ username }: { username: string }) {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const getUserProfile = async (username: string) => {
        try {
            const res = await api.get(`users/${username}/profile`)
            const profile = res.data.data
            setProfile(profile)
        } catch (error) {
            console.log(error);
        } finally { setIsLoading(false) }
    }

    useEffect(() => {
        getUserProfile(username)
    }, [username, setIsLoading])

    if (isLoading) return <h1>Loading...</h1>

    if (!profile) {
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
            <ProfileHeader profile={profile} />

            {/* Profile Action */}
            <ProfileAction profile={profile} />

            {/* Posts Grid */}
            <ProfileTabs posts={profile.posts} ownProfile={profile.isOwnProfile} savedPost={profile.savedPost} />
        </div>
    )
}