// /pages/api/auth/signup.ts
import { SignupProps, SignupResponse } from '@packages/apiCommunicator/src/interactions/signup';
import Prisma from '../../../utils/server/prisma';
import { genSalt, hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {isEmail, isAlpha, isMobilePhone} from 'validator';
import { ResponseType } from '@packages/apiCommunicator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const response_internal_server_error: SignupResponse = {
        type: ResponseType.error,
        errorMessage: 'Internal server error',
        authed: false,
        token: null
    }

    const response_custom_error = (message: string): SignupResponse => {
        return {
            type: ResponseType.error,
            errorMessage: message,
            authed: false,
            token: null
        }
    }
    
    if (req.method !== 'POST') {
        return res.status(200).json(response_internal_server_error);
    }
    
    try {

        const props: SignupProps = req.body;

        if(!isEmail(props.email)){
            return res.status(200).json(response_custom_error('Invalid email'));
        }

        if(!isAlpha(props.firstName)){
            return res.status(200).json(response_custom_error('Invalid first name'));
        } 

        if(!isAlpha(props.lastName)){
            return res.status(200).json(response_custom_error('Invalid last name'));
        }

        if(!isMobilePhone(props.phoneNumber)){
            return res.status(200).json(response_custom_error('Invalid phone number'));
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
            return res.status(200).json(response_custom_error('An account with that email already exists, please try another email or login with that email instead'));
        }

        const saltRounds = 10;
        const salt = await genSalt(saltRounds);

        const hashedPassword = await hash(props.password, salt);

        try {
            createClient(props.email, hashedPassword, props.firstName, props.lastName, props.phoneNumber);
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

/**
 * Create a account with a client connected to it
 */
const createClient = async (email: string, hashedPassword: string, firstName: string, lastName: string, phoneNumber: string) => {
    await Prisma.account.create({
        data: {
            email: email,
            password: hashedPassword,
            client: {
                create: {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber
                }
            }
        }
    });
}
