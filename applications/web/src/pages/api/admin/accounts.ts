import logger from '@/utils/server/logger';
import Prisma from '../../../utils/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import RouteGuard from '@/utils/server/routeGuard';

import { ResponseType } from '@packages/apiCommunicator';
import { AccountsGetProps, AccountsProps, AccountsResponse } from '@packages/apiCommunicator/src/interactions/accounts';
import { renewToken } from '@/utils/server/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response_internal_server_error: AccountsResponse = {
        type: ResponseType.error,
        errorMessage: "Internal server error",
        authed: false,
        token: null,
    }

    const response_unauthorized: AccountsResponse = {
        type: ResponseType.ok,
        errorMessage: "Unauthorized",
        authed: false,
        token: null,
    }

    const response_incorrect_usage: AccountsResponse = {
        type: ResponseType.error,
        errorMessage: "Incorrect usage",
        authed: false,
        token: null,
    }

    await RouteGuard({ req, res, allowAdmin: true }).catch((error) => {
        logger.error('Error in RouteGuard', error);
        return res.status(200).json(response_unauthorized);
    });

    const get_accounts = async (): Promise<void> => {
        let getProps: AccountsGetProps;

        try {
            getProps = req.body.get;
        } catch (error) {
            return res.status(200).json(response_incorrect_usage);
        }

        //validation
        if (!getProps || !getProps.index || !getProps.count) {
            return res.status(200).json(response_incorrect_usage);
        }

        let accounts;

        try {
            accounts = await Prisma.account.findMany({
                skip: getProps.index,
                take: getProps.count
            });
        } catch (error) {
            return res.status(200).json(response_internal_server_error);
        }

        const token: string | undefined = await renewToken(req);

        if (!token) {
            logger.error('In accounts, unable to renew token');
            return res.status(200).json(response_internal_server_error);
        }

        const response: AccountsResponse = {
            type: ResponseType.ok,
            authed: true,
            token,
        }

        return res.status(200).json(response);

    }

    try {
        const props: AccountsProps = req.body;

        if (props.get) {
            await get_accounts();
        } else {
            return res.status(200).json(response_incorrect_usage);
        }


    } catch (error) {
        logger.error('Error in accounts', error);
        return res.status(200).json(response_internal_server_error);
    }
}

