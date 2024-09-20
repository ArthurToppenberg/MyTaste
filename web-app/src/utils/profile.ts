import { IProfile } from "@/pages/api/protected/profile";

export const getProfile = async (): Promise<IProfile> => {
    const res = await fetch('/api/protected/profile');
    const data = await res.json();
    return data;
};