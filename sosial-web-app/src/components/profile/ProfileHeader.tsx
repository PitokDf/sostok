import { Profile, User } from "@/lib/types";
import Username from "../ui/Username";
import ProfilePicture from "../ProfilePicture";

export default function ProfileHeader({ profile }: { profile: Profile }) {
    const user: User | any = {
        username: profile.username,
        profilePicture: profile.profilePicture!
    }
    return (
        <>
            <div className="flex mb-3 items-center justify-evenly md:justify-center gap-3">
                <ProfilePicture user={user} className="w-24 h-24 md:w-32 md:h-32" />
                <div className="flex justify-center md:justify-start space-x-8 my-4">
                    <div className="text-center">
                        <p className="font-semibold">{profile.postsCount}</p>
                        <p className="text-sm text-muted-foreground">posts</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold md:text-base">{profile.followers}</p>
                        <p className="text-sm md:text-base text-muted-foreground">followers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">{profile.followings}</p>
                        <p className="text-sm text-muted-foreground">following</p>
                    </div>
                </div>
            </div>
            <div className="mb-3 md:flex md:items-center space-y-1 md:flex-col">
                <Username username={profile.username} isVerified={profile.isVerified} className="font-semibold md:text-xl" />
                <p className="text-sm whitespace-pre-line">
                    {profile.bio || "No bio yet"}
                </p>
            </div>
        </>
    );
}