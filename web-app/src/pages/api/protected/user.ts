import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import Prisma from '../../../utils/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export interface IUser {
    id: number;
    permission: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret });

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const user = await Prisma.user.findUnique({
                where: {
                    id: token.id as number,
                },
                select: {
                    id: true,
                    permission: true,
                },
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}