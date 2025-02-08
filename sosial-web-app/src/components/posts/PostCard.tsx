import { Card } from "../ui/Card";
import ImageSwiper from "../ImageSwiper";
import { Post } from "@/lib/types";
import PostHeader from "./PostHeader";
import PostAction from "./PostAction";

export default function PostCard({ post }: { post: Post }) {
    return (
        <Card className="overflow-hidden border-none max-w-full rounded-none">
            {/* Post Header */}
            <PostHeader user={post.user} post={post} />
            <div className={`relative min-w-full h-[450px] md:min-w-[590px]`}>
                <ImageSwiper images={post.images} />
            </div>
            <PostAction post={post} />
        </Card>
    );
}