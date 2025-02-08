import { ProfileContent } from "@/components/profile";
import { notFound } from "next/navigation";
import { Metadata } from "next"

interface ProfilePageProps {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
    const { username } = await params
    return {
        title: `@${username} - Sostok Profile`,
        description: `Profile page of ${username} on Sostok`,
        openGraph: {
            title: `@${username}'s Profile`,
            description: `View ${username}'s posts and activities on Sostok`,
        }
    }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
    const { username } = await params
    try {
        return <ProfileContent username={username} />
    } catch (error) {
        console.error(`Error fetching profile for ${username}:`, error);
        notFound();
    }
}
