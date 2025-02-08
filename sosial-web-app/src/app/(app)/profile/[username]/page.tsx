import { ProfileContent } from "@/components/profile";
import { notFound } from "next/navigation";
import { Metadata } from "next"

interface ProfilePageProps {
    params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
    const { username } = await params
    return {
        title: `@${username} - SOSTOK Profile`,
        description: `Profile page of ${username} on SOSTOK`,
        openGraph: {
            title: `@${username}'s Profile`,
            description: `View ${username}'s posts and activities on SOSTOK`,
            siteName: "SOSTOK",
            images: ["https://sostok.vercel.app/images/favicon.ico"],
            locale: 'id_ID',
            type: "website"
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
