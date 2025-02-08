'use client'

import React, { useEffect, useState } from "react";
import { Camera, MoreVertical, Heart, MessageCircle, User2Icon, BadgeCheck, Edit, Share, CameraOff, ImagePlus, User2, Video } from "lucide-react";
import { ProfileType } from "@/types/profile";
import { useParams } from "next/navigation";
import api from "@/config/axios.config";
import { useAuth } from "@/context/AuthContext";
import FollowUI from "@/components/ui/FollowUI";
import NotFoundPage from "../not-found";
import Button from "@/components/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import Image from "next/image";

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const { username } = useParams();
    const [data, setData] = useState<ProfileType | null>(null);
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fetchProfileData = async () => {
        try {
            const response = await api.get(`users/${username}/profile`);
            setData(response.data.data);
        } catch (error: any) {
            console.log(error.message);
            setErrorCode(error.status)
        }
    }

    useEffect(() => {
        if (username) {
            fetchProfileData()
            if (typeof document !== "undefined") {
                document.title = `profile - ${username}`
            }
        }
    }, [username]);

    const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        try {
            const formData = new FormData();
            formData.append('profileImage', e.target.files[0]);

            const response = await api.post(`/users/${data?.id}/profile-picture`, formData);
            setData(prev => prev ? { ...prev, profilePicture: response.data.data.profilePicture } : null);
        } catch (error) {
            console.error('Failed to update profile picture:', error);
        }
    };

    const handleShareProfile = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    alert("Link copied!");
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                    alert("Failed to copy link.");
                });
        } else {
            alert("Clipboard API is not supported in this browser.");
        }
    };


    if (errorCode === 404) return <NotFoundPage />

    if (!data) return (
        <div className="max-w-[500px] mx-auto p-4">
            <div className="animate-pulse space-y-6">
                <Skeleton className=" h-8 w-1/3 rounded" />
                <div>
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="flex gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="text-center">
                                <Skeleton className="h-6 w-8 mb-2 rounded" />
                                <Skeleton className="h-4 w-16 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-6 w-1/2 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            </div>
        </div>
    )

    const isOwnProfile = data.isOwnProfile;

    return (
        <div className="mx-auto p-4 max-w-[500px] text-black ">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b">
                <h1 className="text-xl font-bold">{data.username}'s Profile</h1>
                {isOwnProfile && (
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg py-2 w-48 z-10">
                                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </button>
                                <button className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center">
                                    <ImagePlus className="w-4 h-4 mr-2" />
                                    Change Cover
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Profile Info */}
            <div className="flex items-center justify-between mt-6">
                {/* Avatar */}
                <div className="relative group">
                    {data.profilePicture ? (
                        <div className="w-24 h-24 rounded-full border-2 border-warning overflow-hidden">
                            <Image
                                src={data.profilePicture}
                                alt={`${data.username}'s profile`}
                                width={96}
                                height={96}
                                className="object-cover hover:brightness-90 transition-all"
                            />
                        </div>
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <User2 className="text-white w-16 h-16" />
                        </div>
                    )}
                    {isOwnProfile && (
                        <div className="absolute bottom-0 right-0 p-1 cursor-pointer bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all">
                            <Camera className="w-5 h-5 text-gray-600 cursor-pointer" />
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                            />
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="flex gap-6">
                    <button className="flex flex-col items-center hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <span className="text-lg font-semibold text-primary">
                            {data.postsCount}
                        </span>
                        <span className="text-gray-600 text-sm">Posts</span>
                    </button>
                    <button className="flex flex-col items-center hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <span className="text-lg font-semibold text-primary">
                            {data.followers}
                        </span>
                        <span className="text-gray-600 text-sm">Followers</span>
                    </button>
                    <button className="flex flex-col items-center hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <span className="text-lg font-semibold text-primary">
                            {data.followings}
                        </span>
                        <span className="text-gray-600 text-sm">Following</span>
                    </button>
                </div>
            </div>

            {/* Profile Name & Bio */}
            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">{data.username}</h2>
                    {data.isVerified && <BadgeCheck className="w-5 h-5 text-white" fill="blue" />}
                </div>
                <p
                    className="text-gray-600 break-words whitespace-pre-line"
                    style={{ whiteSpace: 'pre-line' }}
                >
                    {data.bio || (
                        <span className="italic text-gray-400">No bio yet</span>
                    )}
                </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
                {
                    isOwnProfile ? (<>
                        < button className="w-full px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100">
                            Edit Profile
                        </button>
                        <button onClick={handleShareProfile} className="w-full px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100">
                            Share Profile
                        </button>
                    </>) : (<>
                        <FollowUI isFollowing={data.isFollowing} userID={data.id} />
                        <button className="w-full px-4 py-2 text-sm font-semibold text-gray-700 border rounded-lg hover:bg-gray-100">
                            Message
                        </button></>)
                }
            </div>

            {/* Posts */}
            {
                data.posts.length > 0 ? (
                    <div className="grid gap-1 grid-cols-3 mt-6">
                        {data?.posts.map((post) => (
                            <PostPreview post={post} key={post.id} />
                        ))}
                    </div>
                ) :
                    (
                        <div className="mt-12 flex flex-col items-center justify-center text-center">
                            <CameraOff className="w-16 h-16 text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500">No Posts Yet</h3>
                            {isOwnProfile && (
                                <Button className="mt-4"
                                //   onClick={handleCreateFirstPost}
                                >
                                    Create Your First Post
                                </Button>
                            )}
                        </div>
                    )
            }
        </div>
    );
};


const PostPreview = ({ post }: { post: any }) => {
    const isVideo = post.images[0].endsWith('.mp4');

    return (
        <div className="relative group aspect-square">
            <div className="absolute inset-0 z-50 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1 fill-current" />
                    {post.likeCount}
                </div>
                <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1 fill-current" />
                    {post.commentCount}
                </div>
            </div>

            {isVideo ? (
                <video className="object-cover w-full h-full">
                    <source src={post.images[0]} type="video/mp4" />
                </video>
            ) : (
                <Image
                    src={post.images[0]}
                    alt={`Post by ${post.author}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 200px"
                />
            )}

            {isVideo && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                    <Video className="w-4 h-4 text-white" />
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
