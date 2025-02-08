import { Post, User } from "@/lib/types";
import Username from "../ui/Username";
import { dateToHuman } from "@/utils/dateToHuman";
import ProfilePicture from "../ProfilePicture";

export default function PostHeader({ user, post }: { user: User, post: Post }) {
    return (
        <div className="p-3 md:p-4 flex md:gap-3 items-center justify-between">
            <div className="flex items-center space-x-3">
                <ProfilePicture user={user} className="h-8 w-8 md:h-10 md:w-10" />
                <div>
                    <Username className="font-semibold text-sm md:text-base" username={user.username} isVerified={user.isVerified} />
                    <p className="text-xs md:text-sm text-gray-300">
                        {dateToHuman(post.uploadAt!)}
                    </p>
                </div>
            </div>
        </div>
    );
}