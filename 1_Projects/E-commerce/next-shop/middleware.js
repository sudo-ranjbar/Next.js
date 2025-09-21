import { NextResponse } from "next/server"


export function middleware(req) {

    const userToken = req.cookies.get('token')

    if (!userToken) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/cart'
    ]
}