/*

    1. Gets the token
    2. Gets the account
    
*/

import Prisma from '../../utils/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getTokenData } from '@/utils/server/token';

interface RouteGuardProps{
    req: NextApiRequest;
    res: NextApiResponse;
    allowClient?: boolean;
    allowRestaurant?: boolean;
    allowAdmin?: boolean;
}

const routeGuard = async ({ req, res, allowClient, allowRestaurant, allowAdmin }: RouteGuardProps): Promise<void> => {
    const token = await getTokenData(req);

    if(!token || token === null || token === undefined){
        return Promise.reject('Token not found');
    }

    const account = await Prisma.account.findFirst({
        where: {
            id: token.account_id
        },
        select: {
            client: true,
            restaurant: true,
            admin: true
        }
    });

    if(!account || account === null || account === undefined){
        return Promise.reject('Account not found');
    }

    if(account.client && allowClient){
        return;
    }

    if(account.restaurant && allowRestaurant){
        return;
    }

    if(account.admin && allowAdmin){
        return;
    }

    return;
}

export default routeGuard;