import axios from 'axios';

export interface singinResponse {
    token?: string;
    message?: string;
}

export interface singinProps {
    apiPath: string;
    localSaveToken: (token: string) => void;
    localGetToken: () => string;
    email: string;
    password: string;
}

// endpoint = "/auth/authenticate"
export async function authenticate({apiPath, localSaveToken, localGetToken, email, password}: singinProps): Promise<singinResponse> {
    const endpoint = "/auth/signin";

    try {
        const response = await axios.post(`${apiPath}${endpoint}`, {
            email,
            password
        });

        const signinResponse: singinResponse = response.data;

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