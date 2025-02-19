"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Search as SearchIcon } from "lucide-react"
import UserCard from "@/components/search/UserCard"
import { Profile } from "@/lib/types"
import { useDebounce } from "@/hooks/useDebounce"
import { useQuery } from "@tanstack/react-query"
import api from "@/config/axios.config"

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const debounceQuery = useDebounce<string>(searchQuery, 500)

    const { data: users = [], isLoading } = useQuery<Profile[]>({
        queryKey: ['search', debounceQuery],
        queryFn: async () => {
            if (!debounceQuery.trim()) return []
            const res = await api.get(`/users/${debounceQuery}/search`)
            return res.data.data
        },
        enabled: !!debounceQuery,
        staleTime: 1000 * 60
    })

    return (
        <div className="container max-w-2xl py-4 md:py-8">
            <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-4">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users, hashtags, or interests..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}

                {users.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No users found matching "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    )
}