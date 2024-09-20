// MAIN MIDDLEWARE FILE
import { NextResponse } from 'next/server';
import { protectedMiddleware } from './middleware/protectedMiddleware';
import { adminMiddleware } from './middleware/adminMiddleware';

export async function middleware(req) {
    const url = req.nextUrl;

    // Apply protected middleware to all routes under `/protected`
    if (url.pathname.startsWith('/protected') || url.pathname.startsWith('/api/protected')) {
        const protectedResponse = await protectedMiddleware(req);
        if (protectedResponse) return protectedResponse;

        // Apply admin middleware to all routes under `/protected/admin`
        if (url.pathname.startsWith('/protected/admin') || url.pathname.startsWith('/api/protected/admin')) {
            const adminResponse = await adminMiddleware(req);
            if (adminResponse) return adminResponse;
        }
    }

    // If all middleware pass, proceed to the next middleware or route
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ['/protected/:path*', '/api/protected/:path*'],
};