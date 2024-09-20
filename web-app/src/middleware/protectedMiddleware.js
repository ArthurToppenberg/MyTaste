import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function protectedMiddleware(req) {
    console.log('Protected Middleware triggered for:', req.url);

    // Retrieve the JWT token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If no token is found, redirect to the sign-in page
    if (!token) {
        const signInUrl = new URL('/auth/signin', req.url);
        console.log('No token found, redirecting to:', signInUrl.toString());
        return NextResponse.redirect(signInUrl);
    }

    return null;
}