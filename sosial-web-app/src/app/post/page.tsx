import PostCard from "@/components/ui/PostCard";

export default function post() {
    return (
        <div className="flex flex-col items-center">
            <PostCard post={
                {
                    caption: "test pertama posting #first",
                    commentCount: 12,
                    images: ["/profile.png"],
                    likeCount: 23,
                    postID: 1,
                    progileImg: "/profile.png",
                    username: "pitok_df",
                    saveCount: 12,
                    uploadAt: "23-21-2004"
                }
            } />
        </div>
    );
}