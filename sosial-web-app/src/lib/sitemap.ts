// lib/sitemap.ts

import { User } from "./types";

export const generateSitemap = (
    users: Pick<User, 'username' | 'updatedAt'>[]
) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <priority>1.0</priority>
        </url>
    
        ${users.map(user => `
        <url>
            <loc>${baseUrl}/profile/${user.username}</loc>
            <lastmod>${user?.updatedAt!}</lastmod>
            <priority>0.8</priority>
        </url>
    `).join('')}
    </urlset>`;
};