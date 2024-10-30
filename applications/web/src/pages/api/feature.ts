import logger from '@/utils/server/logger';
import Prisma from '../../utils/server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import RouteGuard from '@/utils/server/routeGuard';

import { ResponseType } from '@packages/apiCommunicator';
import { FeatureProps, FeatureResponse, FeatureSetProps } from '@packages/apiCommunicator/src/interactions/feature';
import { renewToken } from '@/utils/server/token';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response_internal_server_error: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "Internal server error",
        authed: false,
        token: null,
        features: null,
        feature: null,
    }

    const response_unauthorized: FeatureResponse = {
        type: ResponseType.ok,
        errorMessage: "Unauthorized",
        authed: false,
        token: null,
        features: null,
        feature: null,
    }

    const response_incorrect_usage: FeatureResponse = {
        type: ResponseType.error,
        errorMessage: "Incorrect usage",
        authed: false,
        token: null,
        features: null,
        feature: null,
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
            features: features,
            feature: null,
        }

        return res.status(200).json(response);
    }

    const set_feature = async (): Promise<void> => {
        let setProps: FeatureSetProps

        try {
            setProps = req.body.set;
        } catch (error) {
            return res.status(200).json(response_incorrect_usage);
        }

        //Do some validation here
        if (!setProps.id || !setProps.name || !setProps.min || !setProps.max) {
            return res.status(200).json(response_incorrect_usage);
        }

        //max > min
        if (parseFloat(setProps.max) <= parseFloat(setProps.min)) {
            return res.status(200).json(response_incorrect_usage);
        }

        let feature;

        try {
            feature = await Prisma.features.update({
                where: { id: setProps.id },
                data: {
                    name: setProps.name,
                    min: parseFloat(setProps.min),
                    max: parseFloat(setProps.max)
                }
            });
        } catch (error) {
            logger.error('Error in updating feature', error);
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
            features: null,
            feature: feature,
            message: "Feature succsessfully updated"
        }

        return res.status(200).json(response);
    }

    try {
        const props: FeatureProps = req.body;

        if (props.get) {
            return get_features();
        } else if (props.set) {
            return set_feature();
        } else {
            return res.status(200).json(response_incorrect_usage);
        }

    } catch (error) {
        logger.error('Error in handler', error);
        return res.status(200).json(response_internal_server_error);
    }
}

