import { IClient } from "@/pages/api/client/client";
import { IAuthContext } from "@packages/authProvider/src/authContext";

export const getClient = async (authedRequest: IAuthContext['authedRequest']): Promise<IClient> => {
    try {
        const response = await authedRequest('/client/client', 'GET').catch((message) => {
            console.error('ERROR - Failed to fetch client: ', message);
            return Promise.reject({ message });
        });

        if (response.message) {
            return Promise.reject(`Not authenticated to make this request: ${response.message}`);
        }

        const client: IClient = response;
        return client;
    } catch (error) {
        if (error instanceof Error) {
            return Promise.reject(`Failed to fetch client: ${error.message}`);
        } else {
            return Promise.reject('Failed to fetch client: An unknown error occurred');
        }
    }
};