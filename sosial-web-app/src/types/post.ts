export interface PostType {
    user: User,
    postID: number;
    hastags: Array<string>;
    images: Array<string>;
    likeCount: number;
    commentCount: number;
    saveCount: number;
    caption: string;
    likedBy: Array<string>;
    uploadAt: string;
}


export interface User {
    userID: number;
    username: string;
    email: string;
    bio: string | null;
    profilePicture: string | null;
    isVerified: boolean;
}
