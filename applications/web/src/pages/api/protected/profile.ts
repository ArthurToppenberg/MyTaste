import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../utils/server/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export interface IProfile {
    name?: string;
    phoneNumber?: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const token = GET TOKEN HERE

    // if (!token) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }

    // if (token.id === undefined) {
    //     return res.status(401).json({ message: 'Error authenticating' });
    // }

    // if (req.method === 'GET') {
    //     try {
    //         const profile = await Prisma.profile.findUnique({
    //             where: {
    //                 id: parseInt(token.id as string, 10), // Convert token.id to an integer
    //             },
    //             select: {
    //                 name: true,
    //                 phoneNumber: true,
    //             },
    //         });

    //         if (!profile) {
    //             return res.status(404).json({ message: 'Profile not found' });
    //         }

    //         const response: IProfile = profile;

    //         return res.status(200).json(response);
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ message: 'Internal server error' });
    //     }
    // } else {
    //     return res.status(405).json({ message: 'Method not allowed' });
    // }
}
