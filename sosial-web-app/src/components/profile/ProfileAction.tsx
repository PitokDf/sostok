import { Settings } from "lucide-react";
import { Button } from "../ui/Button";
import { Profile } from "@/lib/types";
import { ShareProfileModal } from "../ShareProfileModal";
import FollowAction from "./FollowAction";
import InitiateMessageButton from "./InitiateMessageButton";

export default function ProfileAction({ profile }: { profile: Profile }) {
    return (
        <div className="flex gap-2 mb-3">
            {profile.isOwnProfile ? (
                <>
                    <Button
                        className="w-full flex-1"
                        variant="default"
                        size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                    <ShareProfileModal username={profile.username} />
                </>
            ) : (
                <>
                    <FollowAction className="flex-1" following={profile.isFollowing} userID={profile.id} />
                    <InitiateMessageButton targetID={profile.id} />
                </>
            )}
        </div>
    );
}