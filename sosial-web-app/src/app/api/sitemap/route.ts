import { generateSitemap } from "@/lib/sitemap";
import { User } from "@/lib/types";
import { cleanEnv } from "@/utils/cleanEnv";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users: User[] = (await axios.get(`${cleanEnv(process.env.API_URL!)}/users/all`)).data.data

        const sitemap = generateSitemap(users)

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'text/xml',
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
            }
        })
    } catch (error) {
        console.error('Sitemap generation error:', error);
        return new NextResponse(null, { status: 500 });
    }
}