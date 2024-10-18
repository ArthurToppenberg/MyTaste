import React, { createContext, useContext } from 'react';
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
    token: null as string | null,
    });

export interface AuthProviderProps {
    children: React.ReactNode;
    saveToken: (token: string) => void;
    removeToken: () => void;
    getToken: () => string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, saveToken, removeToken, getToken }) => {
    const [token, setToken] = React.useState<string | null>(getToken());

    const { api_login } = useApiContext();

    const login = async (email: string, password: string) => {
        const response = await api_login({ email, password });

        console.log(response);

        if(response.type === ResponseType.ok && response.token){
            saveToken(response.token);
            setToken(response.token);
        }

        return response;
    };

    const logout = () => {
        removeToken();
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);