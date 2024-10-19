import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next'; // Import NextApiRequest type from Next.js
import logger from './logger';

interface TokenData {
    account_id: number;
}

// Extract token from request headers
export const extractTokenFromRequest = (request: NextApiRequest): string | null => {
    const token: string = request.body.headers['Token'] as string;
    if (!token) {
        logger.error('Token not found in request');
        return null;
    }
    return token;
};

// Encrypt token with expiration time
export const encryptToken = async (data: TokenData): Promise<string> => {
    return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: `${process.env.TOKEN_EXPIRATION_MINUTES}m` });
};

// Decrypt token
export const decryptToken = async (token: string): Promise<TokenData | null> => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenData;
        return decoded;
    } catch (error) {
        logger.error('Failed to decrypt token', error);
        return null;
    }
};

// Verify token
export const verifyToken = async (token: string | undefined): Promise<boolean> => {
    if (!token) {
        return false; // Return false if the token is undefined
    }
    
    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        return true;
    } catch (error) {
        return false;
    }
};

export const getTokenData = async (request: NextApiRequest): Promise<TokenData | null> => {
    const token = extractTokenFromRequest(request);
    if (!token) {
        return null;
    }
    
    return decryptToken(token);
}

export const renewToken = async (request: NextApiRequest): Promise<string | undefined> => {
    const tokenData = await getTokenData(request);
    if (!tokenData) {
        return undefined;
    }

    const newTokenData: TokenData = {
        account_id: tokenData.account_id
    };
    
    return encryptToken(newTokenData);
}
