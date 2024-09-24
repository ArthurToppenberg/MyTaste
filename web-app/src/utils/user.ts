import { IUser } from "@/pages/api/protected/user";

export const getUser = async (): Promise<IUser> => {
    const res = await fetch('/api/protected/user');
    const data = await res.json();
    return data;
};