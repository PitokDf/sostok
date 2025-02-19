import { UserCheck, UserPlus } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";
import api from "@/config/axios.config";

export default function FollowAction({ following, userID, className }: { following: boolean, userID: number, className?: string }) {
    const [isFollowing, setIsFollowing] = useState(following)

    const handleFollow = async () => {
        try {
            isFollowing ? await api.delete(`/users/${userID}/unfollow`) : await api.post(`/users/${userID}/follow`);
            setIsFollowing(!isFollowing)
        } catch (error: any) {
            console.error(error.message);
        }
    }
    return (
        <Button
            className={`w-full ${className}`}
            size={"sm"}
            onClick={handleFollow}
            variant={isFollowing ? "secondary" : "default"}
        >
            {isFollowing ? (
                <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Following
                </>
            ) : (
                <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Follow
                </>
            )}
        </Button>
    );
}