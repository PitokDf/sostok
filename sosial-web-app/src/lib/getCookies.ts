import { cookies } from "next/headers";

export async function getCookieHeader() {
    const cookieStored = cookies();
    const allCookies = (await cookieStored).getAll();
    return allCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
}