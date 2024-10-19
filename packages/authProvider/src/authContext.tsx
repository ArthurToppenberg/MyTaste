import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApiContext, ResponseType } from '@packages/apiCommunicator';
import { LoginResponse } from '@packages/apiCommunicator/src/interactions/login';

/*
    authenticate
    unAuthenticate
    token -> only return string else null
*/
export const AuthContext = createContext({
    login: (email: string, password: string) => Promise.resolve({} as LoginResponse),
    logout: () => {},
    updateToken: (token: string) => {},
    token: null as string | null,
});

export interface AuthProviderProps {
    children: React.ReactNode;
    saveToken: (token: string) => void;
    removeToken: () => void;
    getToken: () => string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, saveToken, removeToken, getToken }) => {
    const [token, setToken] = useState<string | null>(null);

    const { api_login, set_token } = useApiContext();

    const login = async (email: string, password: string) => {
        const response = await api_login({ email, password });

        if(response.type === ResponseType.ok && response.token){
            updateToken(response.token);
        }

        return response;
    };

    const logout = () => {
        removeToken();
        setToken(null);
        updateToken('');
    };

    const updateToken = (token: string) => {
        saveToken(token);
        setToken(token);
        set_token(token);
    };

    useEffect(() => {
        const token = getToken();
        if(token){
            updateToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, token, updateToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);