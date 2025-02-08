import { User } from "@/lib/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

export default function ProfilePicture({ user, className }: { user: Pick<User, 'username' | 'profilePicture'>, className?: string }) {
    return (
        <Link href={`/profile/${user.username}`} >
            <Avatar className={`${className}`}>
                <AvatarImage alt={`Profile @${user.username}`} src={user.profilePicture} />
                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
        </Link>
    );
}