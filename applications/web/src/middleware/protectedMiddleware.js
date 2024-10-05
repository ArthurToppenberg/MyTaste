import { NextResponse } from 'next/server';
import { extractToken, verifyToken } from "@/utils/server/token";

export async function protectedMiddleware(req) {
    const token = extractToken(req);
   
    if (verifyToken(token)) {
        return NextResponse.next();
    }

    return null;
}