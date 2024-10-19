// /pages/api/auth/signup.ts
import { SignupProps, SignupResponse } from '@packages/apiCommunicator/src/interactions/signup';
import Prisma from '../../../utils/server/prisma';
import { genSalt, hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {isEmail} from 'validator';
import { ResponseType } from '@packages/apiCommunicator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response_invalid: SignupResponse = {
        type: ResponseType.error,
        errorMessage: 'Invalid email or password',
        authed: false,
        token: null
    }

    const response_internal_server_error: SignupResponse = {
        type: ResponseType.error,
        errorMessage: 'Internal server error',
        authed: false,
        token: null
    }

    const response_user_already_exists: SignupResponse = {
        type: ResponseType.error,
        errorMessage: 'An account with that email already exists, please try another email or login with that email instead',
        authed: false,
        token: null
    }
    
    if (req.method !== 'POST') {
        return res.status(200).json(response_internal_server_error);
    }
    
    try {

        const props: SignupProps = req.body;

        if(!isEmail(props.email)){
            return res.status(200).json(response_invalid);
        }

        let account;

        try {
            account = await Prisma.account.findFirst({
                where: {
                    email: props.email
                },
                select: {
                    id: true,
                }
            });
        } catch (error) {
            return res.status(200).json(response_internal_server_error);
        }

        if (account) {
            return res.status(200).json(response_user_already_exists);
        }

        const saltRounds = 10;
        const salt = await genSalt(saltRounds);

        const hashedPassword = await hash(props.password, salt);

        try {
            await Prisma.account.create({
                data: {
                    email: props.email,
                    password: hashedPassword
                }
            });
        } catch (error) {
            return res.status(200).json(response_internal_server_error);
        }

        const response: SignupResponse = {
            type: ResponseType.ok,
            authed: false,
            token: null
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in singup', error);
        return res.status(200).json(response_internal_server_error);
    }
}
