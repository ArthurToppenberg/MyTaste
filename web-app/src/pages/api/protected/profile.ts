import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

export interface IProfile{
    email: string;
    name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret });

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const profile = await prisma.user.findUnique({
                where: {
                    id: token.id as number,
                },
                select: {
                    email: true,
                    name: true,
                },
            });

            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            return res.status(200).json(profile);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}