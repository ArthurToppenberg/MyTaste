import { NextApiRequest } from "next";
import { extractToken, decryptToken } from "@/utils/server/token";
import Prisma from "./prisma";

export enum Permission {
    ADMIN = "ADMIN",
    DEVELOPER = "DEVELOPER",
    DEFUALT = "DEFAULT"
}

interface PermissionPoliceProps {
    request: NextApiRequest;
    permission: Permission[];
}

/**
 * 
 * @returns void (if valid) | Promise<never> (if error)
 */
const permissionPolice = async (props: PermissionPoliceProps): Promise<void> => {
    try {
        const token = extractToken(props.request);

        if (!token) {
            return Promise.reject('Unauthorized');
        }

        const tokenData = await decryptToken(token as string);

        if (!tokenData) {
            return Promise.reject('Unauthorized');
        }

        const user = await Prisma.user.findUnique({
            where: {
                id: tokenData.user_id
            },
            select: {
                permission: true
            }
        });

        if (!user) {
            return Promise.reject('Unauthorized');
        }

        const userPermission = user.permission as Permission;

        if (!props.permission.includes(userPermission)) {
            return Promise.reject('Unauthorized');
        }

        return;
    } catch (error) {
        console.error('Error in permissionPolice:', error);
        return Promise.reject('Internal Server Error');
    }
};


export default permissionPolice;