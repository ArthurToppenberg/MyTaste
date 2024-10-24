import logger from '@/utils/server/logger';
import Prisma from '../../utils/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getTokenData, renewToken, extractTokenFromRequest } from '@/utils/server/token';
import RouteGuard from '@/utils/server/routeGuard';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await RouteGuard({ req, res, allowAdmin: true }).catch((error) => {
        logger.error('Error in RouteGuard', error);
        return res.status(401).json({ error: 'Unauthorized' });
    });
}

