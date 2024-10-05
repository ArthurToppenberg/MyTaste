import Prisma from '../../../utils/server/prisma';
import { compare } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import {singinResponse, signinProps} from '@packages/authProvider';
import {Token} from '@/types/token';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET') {
        return res.status(405).json({ message: 'No data to provide, please use a post request to signin' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const request: signinProps = req.body;

        const user = await Prisma.user.findFirst({
            where: {
                email: request.email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        });

        const response_invalid: singinResponse = {
            message: 'Invalid email or password'
        }

        if (!user) {
            return res.status(401).json(response_invalid);
        }

        const valid = await compare(request.password, user.password);

        if (!valid) {
            return res.status(401).json(response_invalid);
        }

        // generate jwt token with user id as data
        const tokenData: Token = {
            user_id: user.id as number
        }

        // generate jwt token 
        const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET as string);

        console.log('jwtToken', jwtToken);

        const response: singinResponse = {
            token: jwtToken
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in signin', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}