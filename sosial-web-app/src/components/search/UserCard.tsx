'use client'

import { useRouter } from "next/navigation";
import ProfilePicture from "../ProfilePicture";
import { Profile } from "@/lib/types";
import FollowAction from "../profile/FollowAction";

export default function UserCard({ user }: { user: Profile }) {
    const router = useRouter()
    return (
        <div
            key={user.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => router.push(`/profile/${user.username}`)}
        >
            <div className="flex items-center space-x-3">
                <ProfilePicture user={{ username: user.username, profilePicture: user.profilePicture! }} />
                <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-muted-foreground">{user.username}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{user.bio}</p>
                </div>
            </div>
            {!user.isOwnProfile &&
                <FollowAction className="w-max" following={user.isFollowing} userID={user.id!} />
            }
        </div>
    );
}