import axios from 'axios';

export interface singinResponse {
    token?: string;
    message?: string;
}

export interface singinProps {
    apiPath: string;
    email: string;
    password: string;
}

// endpoint = "/auth/signin"
export async function signin(
    apiPath: string,
    email: string,
    password: string): Promise<singinResponse> {

    // Implement the actual login logic here
    return { token: '', message: '' };
}