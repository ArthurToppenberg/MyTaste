import axios from 'axios';
import { useContext } from 'react';

export interface singinResponse {
    token?: string;
    message?: string;
}

export interface singinProps {
    apiPath?: string;
    email: string;
    password: string;
}

// endpoint = "/auth/signin"
export async function signin(
    apiPath: string,
    email: string,
    password: string): Promise<singinResponse> {
    const endpoint = "/auth/signin";
    
    const { localSaveToken, localGetToken } = useContext();

    try {
        const response = await axios.post(`${apiPath}${endpoint}`, {
            email,
            password
        });

        const signinResponse: singinResponse = response.data;

        if (!signinResponse.token) {
            return { message: 'Something went wrong' };
        }

        localSaveToken(signinResponse.token);
        console.log('saved token');
        localGetToken();
        console.log('got token: ', localGetToken());

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { message: error.response.data.message || 'An error occurred' };
        }
        return { message: 'An unexpected error occurred' };
    }
}
