'use client'


import PostCard from "@/components/ui/PostCard";
import api from "@/config/axios.config";
import { PostType } from "@/types/post";
import { useEffect, useState } from "react";

export default function post() {
    const [data, setData] = useState<PostType[] | null>(null)
    const fetchBerandaData = async () => {
        try {
            const response = await api.get("/posts/users/beranda");
            console.log(response);

            setData(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchBerandaData() }, [])

    if (!data) return <p className="text-black text-center">Loadingg...</p>
    return (
        <div className="flex flex-col items-center">
            {data.map((post, index) => (
                <PostCard key={index + "posts" + post.user.username} post={post || []} />
            ))}
        </div>
    );
}