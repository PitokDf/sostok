'use client'

import PostCard from "@/components/posts/PostCard";
import api from "@/config/axios.config";
import { Post } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const fetchPostingan = useCallback(async (pageNumber: number) => {
        try {
            setIsLoading(true)
            const res = await api.get(`/posts/users/beranda?pageNumber=${pageNumber}&limitNumber=5`)
            const { posts, pagination } = res.data.data
            const data: Post[] = posts
            setPosts(prev => [...prev, ...data]);
            setHasMore(pagination.hasNext)

            if (pagination.hasNext) setPage(pagination.nextPage)
        } catch (error) {
            console.log(error);
        } finally { setIsLoading(false) }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement

            if (scrollTop + clientHeight >= scrollHeight - 500 && !isLoading && hasMore) {
                fetchPostingan(page)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [page, hasMore, isLoading, fetchPostingan])

    useEffect(() => {
        setPosts([])
        setPage(1)
        fetchPostingan(1)
    }, [fetchPostingan])


    return (
        <div className="space-y-0 mb-16 md:space-y-2 md:mb-0 overflow-x-auto max-w-full md:max-w-[600px]">
            {posts.map((post, index) => (
                <PostCard post={post} key={index + post.user.username} />
            ))}
            {isLoading && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-3 border-r-3 border-gray-300"></div>
                </div>
            )}
            {!hasMore && !isLoading && (
                <p className="text-center text-gray-500 py-4">
                    Tidak ada postingan lagi
                </p>
            )}
        </div>
    );
}