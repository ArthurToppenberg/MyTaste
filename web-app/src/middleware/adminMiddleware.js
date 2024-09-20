import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function adminMiddleware(req) {
    console.log('Admin Middleware triggered for:', req.url);

    // Retrieve the JWT token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log('Token:', token);

    return NextResponse.redirect(new URL('/unauthorized', req.url));

    return null;
}