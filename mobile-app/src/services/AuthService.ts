import axios from 'axios';
import { API_BASE_URL } from '@env';

export const AuthService = {
    login: async (email: string, password: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            return response.data;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Login failed');
            } else {
                throw new Error('Cant connect to server');
            }
        }
    },

    register: async (userData: {
        email: string;
        name: string;
        phoneNumber: string;
        password: string;
    }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        // Implement logout logic if necessary
    },
};
