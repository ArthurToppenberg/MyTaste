import { IProfile } from "@/pages/api/protected/profile";

export const getProfile = async (): Promise<IProfile> => {
    try {
        const res = await fetch('/api/protected/profile');
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return Promise.reject(`Failed to fetch profile: ${error.message}`);
        } else {
            return Promise.reject('Failed to fetch profile: An unknown error occurred');
        }
    }
};