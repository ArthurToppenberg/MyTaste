import Prisma from '../../../utils/server/prisma';
import { compare } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {encryptToken} from '@/utils/server/token';

import { ResponseType } from '@packages/apiCommunicator';
import { LoginProps, LoginResponse } from '@packages/apiCommunicator/src/interactions/login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET') {
        return res.status(405).json({ message: 'No data to provide, please use a post request to signin' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const props: LoginProps = req.body;

        const response_invalid: LoginResponse = {
            token: null,
            type: ResponseType.error,
            errorMessage: 'Invalid email or password'
        }

        const response_internal_server_error: LoginResponse = {
            token: null,
            type: ResponseType.error,
            errorMessage: 'Internal server error'
        }

        let account;
        
        try {
            account = await Prisma.account.findFirst({
                where: {
                    email: props.email
                },
                select: {
                    id: true,
                    email: true,
                    password: true
                }
            });
        } catch (error) {
            return res.status(200).json(response_internal_server_error);
        }

        if (!account) {
            return res.status(200).json(response_invalid);
        }

        const valid = await compare(props.password, account.password);

        if (!valid) {
            return res.status(200).json(response_invalid);
        }

        // generate jwt token
        const jwtToken = await encryptToken({ account_id: account.id }).catch(() => {
            return res.status(200).json(response_internal_server_error);
        });

        const response: LoginResponse = {
            token: jwtToken as string,
            type: ResponseType.ok,
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in signin', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}