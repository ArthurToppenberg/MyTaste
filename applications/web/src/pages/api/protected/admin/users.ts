import { NextApiRequest, NextApiResponse } from 'next';
import Prisma from '../../../../utils/server/prisma';
import Authenticator from '../../../../utils/server/authenticator';

interface IUser {
    id: number;
    email: string;
    permission: string;
    type: string;
    profile: {
        name: string;
    } | null;
}

export interface IUsers {
    users: IUser[];
}

export interface IUsersResponse {
    users?: IUser[];
    message?: string;
    hasReachedEnd?: boolean;
}

/**
 * Users api lets you get a list of users from the database in different ways.
 * 
 * @paramiter Search: Lets you search for users based on specified collum.
 * @paramiter SimpleList: Lets you get a list of users starting from a specified id and count. (This is useful for pagination)
 * 
 * To use userprops simply populate the preferred querry method, leave the others empty.
 */
export interface usersProps {
    search?: searchProps,
    simpleList?: simpleListProps,
}

export interface searchProps {
    query: string;
    field: string[];
    count: number;
}

interface simpleListProps {
    index: number;
    limit: number;
}

interface WhereClause {
    OR: Array<{ [key: string]: unknown }>;
}

/**
 * Get a list of users from the database.
 * 
 * @param props simpleListProps
 * @returns IUsersResponse
 * 
 * @example
 * const response = await simpleList({ index: 0, limit: 100 });
 * console.log(response.users);
 */
async function simpleList(props: simpleListProps): Promise<IUsersResponse> {
    try {
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
            take: props.limit
        });

        if(users.length < props.limit) {
            return { users, hasReachedEnd: true };
        }

        return { users };
    } catch (error) {
        console.error('Error fetching simple list:', error);
        return { message: 'Error fetching users' };
    }
}

/**
 * Search for users in the database.
 * 
 * @param props searchProps
 * @returns IUsersResponse
 * 
 * @example
 * const response = await search({ query: 'example', field: ['email'], count: 10 });
 * console.log(response.users);
 */
async function search(props: searchProps): Promise<IUsersResponse> {
    const whereClause: WhereClause = {
        OR: []
    };

    const normalizedFields = props.field.map((field) => field.toLowerCase());

    // Handle searching by ID (exact match)
    if (normalizedFields.includes('id')) {
        const numericQuery = Number(props.query);

        // Only push to OR clause if the query can be converted to a number
        if (!isNaN(numericQuery)) {
            whereClause.OR.push({
                id: {
                    equals: numericQuery
                }
            });
        }
    }

    // Handle searching by email (partial match, case insensitive)
    if (normalizedFields.includes('email')) {
        whereClause.OR.push({
            email: {
                contains: props.query,
                mode: 'insensitive'
            }
        });
    }

    // Handle searching by profile name (partial match, case insensitive)
    if (normalizedFields.includes('name')) {
        whereClause.OR.push({
            profile: {
                name: {
                    contains: props.query,
                    mode: 'insensitive'
                }
            }
        });
    }

    // Ensure at least one search condition is present
    if (whereClause.OR.length === 0) {
        throw new Error("No valid search fields provided.");
    }

    // Query the database
    const users = await Prisma.user.findMany({
        select: {
            id: true,
            email: true,
            permission: true,
            type: true,
            profile: {
                select: {
                    name: true
                }
            }
        },
        where: whereClause,
        take: props.count
    });

    if(users.length === 0){
        return { message: 'No users could be found.' };
    }

    if(users.length < props.count){
        return { users, hasReachedEnd: true };
    }

    return { users };
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Authenticator({ req, validPermission: ['DEVELOPER', 'ADMIN'] }).then(async (response) => {
        if (!response.passedAuthentication) {
            return res.status(401).json({ message: response.failedMessage });
        }

        // default for get request TESTING PURPOSES
        if (req.method === 'GET') {
            return res.status(200).json(await simpleList({ index: 0, limit: 100 }));
        }

        const requestProps: usersProps = req.body;

        if (!requestProps) {
            return res.status(400).json({ message: 'Invalid request: must provide search or simpleList properties' });
        }

        if ((requestProps.search && requestProps.simpleList) || (!requestProps.search && !requestProps.simpleList)) {
            return res.status(400).json({ message: 'Invalid request: must provide either search or simpleList properties' });
        }

        if (requestProps.simpleList) {
            return res.status(200).json(await simpleList(requestProps.simpleList));
        }

        if (requestProps.search) {
            return res.status(200).json(await search(requestProps.search));
        }
    }).catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    });
}