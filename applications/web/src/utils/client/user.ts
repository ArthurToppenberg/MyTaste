import { IUser } from "@/pages/api/client/user";
import { IAuthContext } from "@packages/authProvider/src/authContext";

export const getUser = async (authedRequest: IAuthContext['authedRequest']): Promise<IUser> => {
    try {
        const response = await authedRequest('/client/user', 'GET').catch((message) => {
            console.error('ERROR - Failed to fetch user: ', message);
            return Promise.reject({ message });
        });

        if (response.message) {
            return Promise.reject(`Not autenticated to make this request: ${response.message}`);
        }

        const user: IUser = response;
        return user;

    } catch (error) {
        if (error instanceof Error) {
            return Promise.reject(`Failed to fetch user: ${error.message}`);
        } else {
            return Promise.reject('Failed to fetch user: Unknown error');
        }
    }
};