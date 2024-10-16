import { IRestaurant } from "@/pages/api/client/restaurant";
import { IAuthContext } from "@packages/authProvider/src/authContext";

export const getRestaurant = async (authedRequest: IAuthContext['authedRequest']): Promise<IRestaurant> => {
    try {
        const response = await authedRequest('/client/restaurant', 'GET').catch((message) => {
            console.error('ERROR - Failed to fetch client: ', message);
            return Promise.reject({ message });
        });

        if (response.message) {
            return Promise.reject(`Not authenticated to make this request: ${response.message}`);
        }

        const restaurant: IRestaurant = response;
        return restaurant;
    } catch (error) {
        if (error instanceof Error) {
            return Promise.reject(`Failed to fetch client: ${error.message}`);
        } else {
            return Promise.reject('Failed to fetch client: An unknown error occurred');
        }
    }
};