import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../../utils/server/prisma';
import Authenticator from '../../../../utils/server/authenticator';

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
 * 
 * @paramiter Search: Lets you search for users based on specified collum.
 * @paramiter SimpleList: Lets you get a list of users starting from a specified id and count. (This is useful for pagination)
 * 
 * To use userprops simply populate the preferred querry method, leave the others empty.
 */
export interface usersProps{
    search?: searchProps,
    simpleList?: simpleListProps,
}

export interface searchProps {
    value: string;
    field: string;
    count: number;
}

interface simpleListProps{
    index: number;
    count: number;
}

async function simpleList(props: simpleListProps): Promise<IUsers> {
    const users = await Prisma.user.findMany({
        select: {
            id: true,
            email: true,
            permission: true,
            type: true,
            profile: {
                select: {
                    name: true,
                }
            }
        },
        skip: props.index,
        take: props.count
    });

    return { users };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Authenticator({ req, validPermission: ['DEVELOPER', 'ADMIN'] }).then(async (response) => {
        if (!response.passedAuthentication) {
            return res.status(401).json({ message: response.failedMessage });
        }
        
        // default for get request TESTING PURPOSES
        if (req.method === 'GET') { 
            return res.status(200).json(await simpleList({ index: 0, count: 100 }));
        }

        const requestProps: usersProps = req.body;

        if (!requestProps) {
            return res.status(400).json({ message: 'Invalid request: must provide search or simpleList properties' });
        }

        if ((requestProps.search && requestProps.simpleList) || (!requestProps.search && !requestProps.simpleList)) {
            return res.status(400).json({ message: 'Invalid request: must provide either search or simpleList properties' });
        }
    }).catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });
}