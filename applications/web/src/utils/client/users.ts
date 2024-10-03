import {IUsersResponse, usersProps} from '../../pages/api/protected/admin/users';

export const getUsers = async (props: usersProps): Promise<IUsersResponse> => {
    try {
        const res = await fetch('/api/protected/admin/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return Promise.reject(`Failed to fetch users: ${error.message}`);
        } else {
            return Promise.reject('Failed to fetch users: Unknown error');
        }
    }
};