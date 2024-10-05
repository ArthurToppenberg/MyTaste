import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next'; // Import NextApiRequest type from Next.js

interface TokenData {
    user_id: number;
}

// Extract token from request headers
export const extractToken = (request: NextApiRequest): string | undefined => {
    return request.headers.token as string | undefined; // Adjusted type casting
};

// Encrypt token
export const encryptToken = async (data: TokenData): Promise<string> => {
    return jwt.sign(data, process.env.JWT_SECRET as string);
};

// Decrypt token
export const decryptToken = async (token: string): Promise<TokenData> => {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenData;
};

// Verify token
export const verifyToken = async (token: string): Promise<boolean> => {
    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        return true;
    } catch (error) {
        return false;
    }
};
