import logger from '@/utils/server/logger';
import Prisma from '../../utils/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getTokenData, renewToken, extractTokenFromRequest } from '@/utils/server/token';

import { ResponseType } from '@packages/apiCommunicator';
import { AccountResponse } from '@packages/apiCommunicator/src/interactions/account';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response_internal_server_error: AccountResponse = {
        id: null,
        email: null,
        is_client: null,
        is_restaurant: null,
        is_admin: null,
        type: ResponseType.error,
        errorMessage: 'Internal server error',
        authed: false,
        token: null,
    }

    const request_custom_error = (message: string): AccountResponse => {
        return {
            id: null,
            email: null,
            is_client: null,
            is_restaurant: null,
            is_admin: null,
            type: ResponseType.error,
            errorMessage: message,
            authed: false,
            token: null
        }
    }

    if (req.method !== 'POST') {
        logger.warn('A request was made to /api/account with an invalid method');
        return res.status(200).json(response_internal_server_error);
    }

    try {
        if(extractTokenFromRequest(req) === null){
            return res.status(200).json(request_custom_error("Request invalid"));
        }

        const tokenData = await getTokenData(req);

        if (!tokenData) {
            return res.status(200).json(request_custom_error("Token Expired"));
        }

        let account;

        try {
            account = await Prisma.account.findFirst({
                where: {
                    id: tokenData.account_id
                },
                select: {
                    id: true,
                    email: true,
                    client: true,
                    restaurant: true,
                    admin: true
                }
            });
        } catch (error) {
            logger.error('Error in account', error);
            return res.status(200).json(response_internal_server_error);
        }

        if(!account){
            return res.status(200).json(request_custom_error("Permision Denied"));
        }

        const is_client = account.client ? true : false;
        const is_restaurant = account.restaurant ? true : false;
        const is_admin = account.admin ? true : false;

        const token: string | undefined = await renewToken(req);

        if(!token){
            logger.error('In accounts, unable to renew token');
            return res.status(200).json(response_internal_server_error);
        }

        const response: AccountResponse = {
            id: account.id,
            email: account.email,
            is_client,
            is_restaurant,
            is_admin,
            type: ResponseType.ok,
            authed: true,
            token
        }

        return res.status(200).json(response);
    }catch (error) {
        logger.error('Error in account', error);
        return res.status(200).json(response_internal_server_error);
    }
}