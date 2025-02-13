'use client'

import { ProfileContent } from "@/components/profile";
import { getFromLocalStorage } from "@/lib/storage";

export default function profile() {
    const user = getFromLocalStorage('user')

    return <ProfileContent username={user?.username!} />
}