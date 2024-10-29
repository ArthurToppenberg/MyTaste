import logger from '@/utils/server/logger';
import Prisma from '../../utils/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import RouteGuard from '@/utils/server/routeGuard';

import { ResponseType } from '@packages/apiCommunicator';
import { FeatureProps, FeatureResponse } from '@packages/apiCommunicator/src/interactions/feature';
import { renewToken } from '@/utils/server/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response_internal_server_error: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "Internal server error",
        authed: false,
        token: null,
        features: null
    }

    const response_unauthorized: FeatureResponse = {
        type: ResponseType.ok,
        errorMessage: "Unauthorized",
        authed: false,
        token: null,
        features: null
    }

    const response_incorrect_usage: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "Incorrect usage",
        authed: false,
        token: null,
        features: null
    }

    await RouteGuard({ req, res, allowAdmin: true }).catch((error) => {
        logger.error('Error in RouteGuard', error);
        return res.status(200).json(response_unauthorized);
    });

    const get_features = async (): Promise<void> => {
        let features;

        try {
            features = await Prisma.features.findMany();
        } catch (error) {
            return res.status(200).json(response_internal_server_error);
        }

        const token: string | undefined = await renewToken(req);

        if (!token) {
            logger.error('In accounts, unable to renew token');
            return res.status(200).json(response_internal_server_error);
        }

        const response: FeatureResponse = {
            type: ResponseType.ok,
            authed: true,
            token,
            features: features
        }

        return res.status(200).json(response);
    }

    try {
        const props: FeatureProps = req.body;

        if (props.get == true) {
            return get_features();
        } else {
            return res.status(200).json(response_incorrect_usage);
        }

    } catch (error) {
        logger.error('Error in handler', error);
        return res.status(200).json(response_internal_server_error);
    }
}

