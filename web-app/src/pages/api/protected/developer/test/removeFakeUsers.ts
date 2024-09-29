import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../../../utils/server/prisma';
import Authenticator from '@/utils/server/authenticator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Authenticator({ req, validPermission: ['DEVELOPER'] }).then(async (response) => {
        if (!response.passedAuthentication) {
            return res.status(401).json({ message: response.failedMessage });
        }

        if(req.method !== 'GET'){
            return res.status(405).json({ message: 'Method Not Allowed' });
        }

        try {
            // Find all users with the name 'FAKE'
            const fakeUsers = await Prisma.user.findMany({
                where: {
                    profile: {
                        name: 'FAKE'
                    }
                },
                include: {
                    profile: true
                }
            });

            // Delete profiles first
            for (const user of fakeUsers) {
                if (user.profile) {
                    await Prisma.profile.delete({
                        where: {
                            id: user.profile.id
                        }
                    });
                }
            }

            // Delete users
            for (const user of fakeUsers) {
                await Prisma.user.delete({
                    where: {
                        id: user.id
                    }
                });
            }

            return res.status(200).json({ message: 'Fake users removed successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

    }).catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });
}