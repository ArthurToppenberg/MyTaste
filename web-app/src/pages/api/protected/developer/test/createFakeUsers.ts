import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../../../utils/server/prisma';
import Authenticator from '@/utils/server/authenticator';
import { hash } from 'bcryptjs';

const chance = require('chance').Chance();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Authenticator({ req, validPermission: ['DEVELOPER'] }).then(async (response) => {
        if (!response.passedAuthentication) {
            return res.status(401).json({ message: response.failedMessage });
        }

        if (req.method !== 'GET') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        const count: number = 100;

        for (let i = 0; i < count; i++) {
            await createFakeUser();
        }

        return res.status(201).json({ message: 'Fake users created successfully' });
    }).catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });
}

async function createFakeUser() {
    const email = chance.email();  // Generating a fake email
    const password = Math.random().toString(36).substring(7);
    const name = 'FAKE';
    const phoneNumber = chance.phone();  // Generating a fake phone number
    const hashedPassword = await hash(password, 10);

    const user = await Prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            profile: {
                create: {
                    name: name,
                    phoneNumber: phoneNumber
                }
            }
        }
    });
    return user;
}
