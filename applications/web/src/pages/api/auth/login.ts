import Prisma from '../../../utils/server/prisma';
import { hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    console.log('req.query', req.query);

}