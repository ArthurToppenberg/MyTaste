import axios from 'axios';

export interface signinResponse {
    token?: string;
    message?: string;
}

export interface signinProps {
    apiPath: string;
    localSaveToken: (token: string) => void;
    localGetToken: () => Promise<string>;
    email: string;
    password: string;
}

export async function authenticate({apiPath, localSaveToken, localGetToken, email, password}: signinProps): Promise<signinResponse> {
    const endpoint = "/authentication/login";

    try {
        const response = await axios.post(`${apiPath}${endpoint}`, {
            email,
            password
        });

        const signinResponse: signinResponse = response.data;

        if (!signinResponse.token) {
            return Promise.reject({ message: 'Something went wrong' });
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { message: error.response.data.message || 'An error occurred' };
        }
        return { message: 'An unexpected error occurred' };
    }
}