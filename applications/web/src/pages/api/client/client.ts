import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../utils/server/prisma';
import jwt from 'jsonwebtoken';

export interface IClient {
    name: string;
    phoneNumber?: string | null;
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

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (decodedToken.user_id === undefined) {
        return res.status(401).json({ message: 'Error authenticating' });
    }

    if (req.method === 'GET') {
        try {
            const client = await Prisma.client.findUnique({
                where: {
                    id: decodedToken.user_id,
                },
                select: {
                    name: true,
                    phoneNumber: true,
                },
            });

            if (!client) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            const response: IClient = client;

            return res.status(200).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
