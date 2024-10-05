import { IProfile } from "@/pages/api/protected/profile";
import { IAuthContext } from "@packages/authProvider/src/authContext";

export const getProfile = async (authedRequest: IAuthContext['authedRequest']): Promise<IProfile> => {
    try {
        const response = await authedRequest('/protected/profile', 'GET').catch((message) => {
            console.error('ERROR - Failed to fetch profile: ', message);
            return Promise.reject({ message });
        });

        if (response.message) {
            return Promise.reject(`Not authenticated to make this request: ${response.message}`);
        }

        const profile: IProfile = response;
        return profile;
    } catch (error) {
        if (error instanceof Error) {
            return Promise.reject(`Failed to fetch profile: ${error.message}`);
        } else {
            return Promise.reject('Failed to fetch profile: An unknown error occurred');
        }
    }
};