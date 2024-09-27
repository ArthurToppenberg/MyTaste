/*
    The purpose of this script is to be called before any api logic is run to ensure that
    the user making the api request has the correct permission to access the api.
*/

import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import Prisma from "../../../utils/server/prisma";

const secret = process.env.NEXTAUTH_SECRET;

interface AuthenticatorProps {
    req: NextApiRequest;
    validPermission: string[];
}

export interface AuthenticatorResponse {
    id: number;
    permission?: string;
    passedAuthentication: boolean;
    failedMessage?: string;
}

/**
 * 
 * @param req NextApiRequest
 * @param validPermission string[]
 * @returns Promise<AuthenticatorResponse> 
 */
export default async function Authenticator({ req, validPermission }: AuthenticatorProps): Promise<AuthenticatorResponse> {
    let response: AuthenticatorResponse = {
        id: 0,
        passedAuthentication: false
    };

    try {
        const token = await getToken({ req, secret });
        if (!token) {
            throw new Error("Token not found");
        }
        response.id = token.id as number;
    } catch (error) {
        response.failedMessage = "Authentication failed: " + (error as Error).message;
        return response;
    }

    try {
        const userPermission = await Prisma.user.findUnique({
            where: {
                id: response.id
            },
            select: {
                permission: true
            }
        });

        if (userPermission && validPermission.includes(userPermission.permission)) {
            response.permission = userPermission.permission;
            response.passedAuthentication = true;
        } else {
            response.failedMessage = "Permission denied";
        }
    } catch (error: any) {
        response.failedMessage = "Internal server error: " + (error as Error).message;
    }

    return Promise.resolve(response);
};
