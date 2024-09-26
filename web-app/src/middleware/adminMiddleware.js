import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import prisma from '../utils/server/prisma'; // Ensure this path is correct

export async function adminMiddleware(req) {
    console.log('Admin Middleware triggered for:', req.url);

    // Retrieve the JWT token from the request
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL('/unauthorized', req.url)); // No token found
    }

    const id = token?.id;

    if (!id) {
        return NextResponse.redirect(new URL('/unauthorized', req.url)); // No user ID found
    }

    try {
        // Retrieve the user's permission from the database
        const userPermission = await prisma.user.findUnique({
            where: { id: id },
            select: { permission: true },
        });

        // Check if userPermission was found
        if (!userPermission) {
            return NextResponse.redirect(new URL('/unauthorized', req.url)); // User not found
        }

        // Check the user's permission
        if (userPermission.permission === 'ADMIN' || userPermission.permission === 'DEVELOPER') {
            return NextResponse.next(); // Allow access
        }

    } catch (error) {
        console.error('Error retrieving user permission:', error);
        return NextResponse.redirect(new URL('/unauthorized', req.url)); // Error case
    }

    return NextResponse.redirect(new URL('/unauthorized', req.url)); // Default redirect
}
