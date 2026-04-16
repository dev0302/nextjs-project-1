import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request});
    const url = request.nextUrl.clone();

    console.log("middleware");
    

    // If user is logged in and trying to access login/register pages
    if (token && (url.pathname === '/sign-in' || url.pathname === '/sign-up')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If user is NOT logged in and trying to access protected pages
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/auth/signin', '/signup']
};



// 1. default middleware
// This file enables route protection using NextAuth middleware.
// It means:
// “Before allowing access to certain routes, check whether the user is authenticated.”

// export { default } from "next-auth/middleware"
// This imports and exports NextAuth’s built-in middleware.
// That middleware automatically:
// Checks if user is logged in
// If authenticated → allow request
// If not authenticated → redirect to sign-in page / return unauthorize
// export { default } from "next-auth/middleware"

// export const config = { 
//     // This 'matcher' is the list of routes you want to PROTECT.
//     // Any route NOT in this list is public.
//     matcher: [
//         "/dashboard/:path*", 
//         "/profile/:path*",
//         "/api/user/:path*"
//     ] 
// }