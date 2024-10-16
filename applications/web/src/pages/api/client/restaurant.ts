import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../utils/server/prisma';
import { getTokenData } from '@/utils/server/token';

export interface IRestaurant {
    name: string;
    location: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getTokenData(req);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const id = token.user_id;

    if (req.method === 'GET') {
        try {
            const restaurant = await Prisma.restaurant.findUnique({
                where: {
                    id: id,
                },
                select: {
                    name: true,
                    location: true,
                },
            });

            if (!restaurant) {
                return res.status(404).json({ message: 'Restaurant not found' });
            }

            const response: IRestaurant = restaurant;

            return res.status(200).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
