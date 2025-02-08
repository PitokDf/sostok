export interface ProfileType {
    id: number;
    username: string;
    email: string;
    bio: string;
    profilePicture: string;
    isVerified: boolean;
    postsCount: number;
    followers: number;
    followings: number;
    likeReceiveCount: number;
    isFollowing: boolean;
    isOwnProfile: boolean;
    posts: Post[];
}

export interface Post {
    id: number;
    images: string[];
    likeCount: number;
    commentCount: number;
}
