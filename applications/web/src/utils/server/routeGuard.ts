import Prisma from '../../utils/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenData, TokenData } from '@/utils/server/token';

interface RouteGuardProps {
    req: NextApiRequest;
    res: NextApiResponse;
    allowClient?: boolean;
    allowRestaurant?: boolean;
    allowAdmin?: boolean;
}

const routeGuard = async ({
    req,
    allowClient,
    allowRestaurant,
    allowAdmin,
}: RouteGuardProps): Promise<TokenData> => {
    const token = await getTokenData(req);

    if (!token) {
        return Promise.reject('Token not found');
    }

    const account = await Prisma.account.findFirst({
        where: { id: token.account_id },
        select: { client: true, restaurant: true, admin: true },
    });

    if (!account) {
        return Promise.reject('Account not found');
    }

    const hasPermission =
        (account.client && allowClient) ||
        (account.restaurant && allowRestaurant) ||
        (account.admin && allowAdmin);

    if (!hasPermission) {
        return Promise.reject('Access denied');
    }

    return token as TokenData;
};

export default routeGuard;
