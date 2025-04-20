export interface User {
    id?: number
    username: string
    email: string
    bio?: string
    profilePicture?: string
    isVerified: boolean
    createdAt?: string
    updatedAt?: string
    posts?: Post[]
}

export interface Post {
    id?: number
    userID: number
    caption?: string
    createdAt?: string
    user: User,
    postID: number;
    hastags: Array<string>;
    images: Array<string>;
    likeCount: number;
    commentCount: number;
    saveCount: number;
    likedBy: Array<string>;
    saveBy: string[];
    uploadAt: string;
}


export interface Profile {
    id: number;
    username: string;
    email: string;
    bio: string | null;
    profilePicture: string | null;
    isVerified: boolean;
    postsCount: number;
    followers: number;
    followings: number;
    likeReceiveCount: number;
    isFollowing: boolean;
    isOwnProfile: boolean;
    savedPost: { id: number, imageUrl: string }[],
    posts: Post[];
}


export interface File {
    id?: string
    fileLink: string
    createdAt?: string
    posts?: Post[]
}

export interface Comment {
    id?: number
    postID: number
    userID: number
    text: string
    createdAt?: string
    user: User
}

export interface Like {
    id?: number
    postID: number
    userID: number
    createdAt?: string
}

export interface Follow {
    id?: number
    followerID: number
    followingID: number
    createdAt?: string
}

export interface Story {
    id?: number
    userID: number
    imageUrls: string[]
    type: string
    createdAt?: string
    expiresAt: string
    user?: User
}

export interface StoryView {
    id?: number
    storyID: number
    viewerID: number
    viewedAt?: string
}

export interface SavedPost {
    id?: number
    postID: number
    userID: number
    createdAt?: string
}

export interface Message {
    id: number;
    isMine?: boolean;
    conversationID: string;
    senderID: number;
    receiverID: number;
    content: string;
    timestamp: string;
    user: User,
    updatedAt: string
}

export interface ListConversation {
    conversationID: string;
    username: string;
    lastMessage: string;
    timeStamp: string;
    avatar: string;
}

