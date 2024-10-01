import React, { createContext, useState, useEffect } from 'react';
import { AuthService } from '../services/AuthService';
import * as SecureStore from 'expo-secure-store';

interface User {
    id: string;
    email: string;
    name: string;
    // Add other user properties as needed
}

interface AuthContextProps {
    user: User | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    isLoggedIn: false,
    login: async () => { },
    logout: () => { },
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        // Check for stored user data on app load
        const loadUserData = async () => {
            try {
                const userData = await SecureStore.getItem('user');
                if (userData) {
                    setUser(JSON.parse(userData));
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            }
        };

        loadUserData();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data = await AuthService.login(email, password);
            // Assuming data contains user info and a token
            setUser(data.user);
            setIsLoggedIn(true);
            // Store user data locally
            await SecureStore.setItem('user', JSON.stringify(data.user));
            await SecureStore.setItem('token', data.token);
        } catch (error) {
            throw error; // Let the calling function handle the error
        }
    };

    const logout = async () => {
        setUser(null);
        setIsLoggedIn(false);
        await SecureStore.deleteItemAsync('user');
        await SecureStore.deleteItemAsync('token');
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
