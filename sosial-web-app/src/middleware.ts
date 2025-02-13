import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const token = await req.cookies.get("accessToken")?.value
    if (!token) {
        if (!pathname.startsWith("/auth/login")) {
            return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
        }
    } else {
        if (pathname.startsWith("/auth/login")) {
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/auth/login", "/", "/create", "/search", "/messages", "/profile"]
}