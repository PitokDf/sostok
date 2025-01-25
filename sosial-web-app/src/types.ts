export interface PostType {
    user: {
        profilePicture?: string;
        username: string;
    },
    postID: number;
    hastags: Array<string>;
    images: Array<string>;
    likeCount: number;
    commentCount: number;
    saveCount: number;
    caption: string;
    uploadAt: string;
}