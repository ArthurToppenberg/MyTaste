import axios from 'axios';

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
    email: string,
    password: string): Promise<singinResponse> {
        const base_url = window.location.origin;
        const endpoint = "/auth/signin";

        console.log(`Email: ${email}, Password: ${password}, API Endpoint: ${base_url}${endpoint}`);

    // Implement the actual login logic here
    return { token: '', message: 'This function is not implemented yet!' };
}