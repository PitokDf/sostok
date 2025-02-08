import { User } from "@/lib/types";
import { Verified } from "lucide-react";

export default function Username({ username, isVerified, className }: { username: string, isVerified: boolean, className?: string }) {
    return (
        <div className="flex gap-1 items-center">
            <span className={className}>{username}</span>
            {isVerified &&
                <Verified className="h-[1.15rem] w-[1.15rem] text-white" fill="blue" />
            }
        </div>
    );
}