import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../utils/server/prisma';
import jwt from 'jsonwebtoken';

export interface IUser {
    id: number;
    permission: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const token = req.headers.token;
    interface tokenData {
        user_id: number;
    }
    const decoded = jwt.decode(token as string);

    if (!decoded || typeof decoded === 'string') {
        console.log('Unauthorized: Invalid token');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken: tokenData = decoded as tokenData;
    
    if (!decodedToken.user_id) {
        console.log('Unauthorized: Token does not contain id');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const user = await Prisma.user.findUnique({
                where: {
                    id: decodedToken.user_id,
                },
                select: {
                    id: true,
                    permission: true,
                },
            });

            if (!user) {
                console.log('User not found');
                return res.status(404).json({ message: 'User not found' });
            }

            const response: IUser = user;
            
            return res.status(200).json(response);
        } catch (error) {
            console.error('Internal server error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        console.log('Method not allowed:', req.method);
        return res.status(405).json({ message: 'Method not allowed' });
    }
}