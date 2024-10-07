import {authenticate, signinProps, signinResponse} from './authService';
import React, { createContext, useEffect, useContext } from 'react';
import axios from 'axios';

interface authRequestDeny{
    message: string;
}

// Interface for the context
export interface IAuthContext {
    apiPath: string;
    localSaveToken: (token: string) => void;
    localDeleteToken: () => boolean;
    localGetToken: () => string;
    authenticate: (email: signinProps['email'], password: signinProps['password']) => Promise<signinResponse>;
    authedRequest: (apiUrl: string, type: 'GET' | 'POST', data?: any) => Promise<any | authRequestDeny>;
    isAuthed: () => boolean;
}

// Default context values
export const AuthContext = createContext<IAuthContext>({
    apiPath: '',
    localSaveToken: async (token: string) => { throw new Error('localSaveToken not implemented'); },
    localDeleteToken: () => { throw new Error('localDeleteToken not implemented'); },
    localGetToken: () => { throw new Error('localGetToken not implemented'); },
    authenticate: async (email: signinProps['email'], password: signinProps['password']) => { throw new Error('signin not implemented'); },
    authedRequest: async (apiUrl: string, type: 'GET' | 'POST', data?: any) => { throw new Error('authedRequest not implemented'); },
    isAuthed: () => { throw new Error('localDeleteToken not implemented'); },
});

// Interface for AuthProvider props
interface AuthProviderProps {
    apiPath: IAuthContext['apiPath'];
    localSaveToken: IAuthContext['localSaveToken'];
    localDeleteToken: IAuthContext['localDeleteToken'];
    localGetToken: IAuthContext['localGetToken'];
    children: React.ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ apiPath, localSaveToken, localDeleteToken, localGetToken, children }) => {
    return (
        <AuthContext.Provider value={{
            apiPath,
            localSaveToken,
            localDeleteToken,
            localGetToken,
            authenticate: async (email: signinProps['email'], password: signinProps['password']) => {
                const response = await authenticate({ apiPath, email, password, localSaveToken, localGetToken });

                if (!response.token && !response.message) {
                    return { message: 'Something went wrong' };
                }

                if (response.message) {
                    return response;
                }

                localSaveToken(response.token || '');
                return response;
            },
            authedRequest: async (apiUrl: string, type: 'GET' | 'POST', data?: any) => {
                const token = localGetToken();
                
                if (!token) {
                    return { message: 'Not authenticated' } as authRequestDeny;
                }

                try {
                    const response = await axios({
                        url: `${apiPath}${apiUrl}`,
                        method: type,
                        headers: {
                            token: token,
                            'Content-Type': 'application/json',
                        },
                        data: data ? JSON.stringify(data) : undefined,
                    });

                    if (response.status !== 200) {
                        return { message: 'Request failed' };
                    }

                    return response.data;
                } catch (error) {
                    return { message: 'An unexpected error occurred' };
                }
            },
            isAuthed: () => {
                const token = localGetToken();
                if(!token){
                    return false;
                }
                return true;
            },
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
