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
            const fakeUsers = await Prisma.user.findMany({
                where: {
                    profile: {
                        name: 'FAKE'
                    }
                }
            });

            await Prisma.profile.deleteMany({
                where: {
                   id: {
                          in: fakeUsers.map(user => user.id)
                     }
                }
            });

            await Prisma.user.deleteMany({
                where: {
                    id: {
                        in: fakeUsers.map(user => user.id)
                    }
                }
            });

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