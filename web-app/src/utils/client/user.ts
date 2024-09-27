import { IUser } from "@/pages/api/protected/user";

export const getUser = async (): Promise<IUser> => {
    try {
        const res = await fetch('/api/protected/user');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return Promise.reject(`Failed to fetch user: ${error.message}`);
        } else {
            return Promise.reject('Failed to fetch user: Unknown error');
        }
    }
};