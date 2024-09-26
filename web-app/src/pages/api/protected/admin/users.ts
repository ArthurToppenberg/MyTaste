import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import Prisma from '../../../../utils/server/prisma';

const secret = process.env.NEXTAUTH_SECRET;

interface IUser {
    id: number;
    email: string;
    permission: string;
    type: string;
}

export interface IUsers {
    users: IUser[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret });

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const users = await Prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    permission: true,
                    type: true
                },
            });

            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'Users not found' });
            }
            
            const response: IUsers = { users };

            return res.status(200).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}