import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../../utils/server/prisma';
import Authenticator from '../authenticator';

interface IUser {
    id: number;
    email: string;
    permission: string;
    type: string;
}

export interface IUsers {
    users: IUser[];
}

/**
 * Users api lets you get a list of users from the database in different ways.
 * Search: Lets you search for users based on specified collum.
 * SimpleList: Lets you get a list of users starting from a specified id and count. (This is useful for pagination)
 * 
 * To use userprops simply populate the preferred querry method, leave the others empty.
 */
export interface usersProps{
    search?: searchProps,
    simpleList?: simpleListProps,
}

export interface searchProps {
    value: string;
    count: number;
}

interface simpleListProps{
    startId: number;
    count: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    Authenticator({ req, validPermission: ['DEVELOPER', 'ADMIN'] }).then(async (response) => {
        if (!response.passedAuthentication) {
            return res.status(401).json({ message: response.failedMessage });
        }

        const requestProps: usersProps = req.body;

        if (!requestProps.search && !requestProps.simpleList) {
            return res.status(400).json({ message: 'Invalid request: must provide either search or simpleList properties' });
        }




        if (req.method === 'GET') {
            try {
                const users = await Prisma.user.findMany({
                    select: {
                        id: true,
                        email: true,
                        permission: true,
                        type: true
                    },
                });

                if (!users || users.length === 0) {
                    return res.status(404).json({ message: 'Users not found' });
                }

                const response: IUsers = { users };

                return res.status(200).json(response);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }
    }).catch((error) => {
        console.error(error);
        return;
    });
}