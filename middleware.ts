// FILE: middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/", "/about", "/api/public"];

export default function middleware(req: NextRequest, event: NextFetchEvent) {
    // Check if the requested route is public
    const isPublicRoute = publicRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );

    // If public, bypass Clerk middleware
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Apply Clerk middleware for private routes
    return clerkMiddleware()(req, event);
}

export const config = {
    matcher: [    // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',], // Match all dynamic routes
};