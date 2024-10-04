import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../../../utils/server/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // await Authenticator({ req, validPermission: ['DEVELOPER'] }).then(async (response) => {
    //     if (!response.passedAuthentication) {
    //         return res.status(401).json({ message: response.failedMessage });
    //     }

    //     if (req.method !== 'GET') {
    //         return res.status(405).json({ message: 'Method Not Allowed' });
    //     }

    //     const count: number = 1000;
    //     console.log(`Creating ${count} fake users...`);
    //     const usersData = await generateFakeUsersData(count);
    //     console.log('Fake users data generated successfully');

    //     console.log('Inserting into database...');
    //     await Prisma.$transaction(
    //         usersData.map(userData => 
    //             Prisma.user.create({
    //                 data: {
    //                     email: userData.email,
    //                     password: userData.hashedPassword,
    //                     profile: {
    //                         create: {
    //                             name: userData.name,
    //                             phoneNumber: userData.phoneNumber,
    //                         }
    //                     }
    //                 }
    //             })
    //         )
    //     );

    //     console.log('Fake users saved to database...');

    //     return res.status(201).json({ message: `Created ${count} fake users...` });
    // }).catch((error) => {
    //     console.error(error);
    //     return res.status(500).json({ message: 'Internal Server Error' });
    // });
}

async function generateFakeUsersData(count: number) {
    const usersData = [];

    for (let i = 0; i < count; i++) {
        const timestamp = Date.now();
        const email = `fak.e${i}.${timestamp}@fake.com`;
        const password = `2345${i}3455534`;
        const hashedPassword = await hash(password, 2);
        const phoneNumber = `45${i}45647657`;
        const name = 'FAKE';

        usersData.push({
            email,
            hashedPassword,
            name,
            phoneNumber
        });
        console.log(`Fake user ${i + 1} created password: ${hashedPassword}`);
    }

    return usersData;
}
