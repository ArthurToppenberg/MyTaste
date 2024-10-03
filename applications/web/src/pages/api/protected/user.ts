import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../utils/server/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export interface IUser {
    id: number;
    permission: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const token = Get token here

    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    // if(token.id === undefined) {
    //     return res.status(401).json({ message: 'Error authenticating' });
    // }

    // if (req.method === 'GET') {
    //     try {
    //         const user = await Prisma.user.findUnique({
    //             where: {
    //                 id: parseInt(token.id as string, 10),
    //             },
    //             select: {
    //                 id: true,
    //                 permission: true,
    //             },
    //         });

    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         const response: IUser = user;

    //         return res.status(200).json(response);
    //     } catch (error) {
    //         return res.status(500).json({ message: 'Internal server error' });
    //     }
    // } else {
    //     return res.status(405).json({ message: 'Method not allowed' });
    // }
}