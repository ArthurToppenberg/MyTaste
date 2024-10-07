import { authenticate, signinProps, signinResponse } from './authService';
import React, { createContext, useEffect, useContext } from 'react';
import axios from 'axios';

interface authRequestDeny {
    message: string;
}

// Interface for the context
export interface IAuthContext {
    apiPath: string;
    localSaveToken: (token: string) => void;
    localDeleteToken: () => Promise<boolean>;
    localGetToken: () => Promise<string>;
    authenticate: (email: signinProps['email'], password: signinProps['password']) => Promise<signinResponse>;
    authedRequest: (apiUrl: string, type: 'GET' | 'POST', data?: any) => Promise<any | authRequestDeny>;
    isAuthed: () => Promise<boolean>;
    setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
    Authed: boolean;
    DeAuthenticate: () => Promise<boolean>;
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
    setAuthed: () => { throw new Error('setAuthed not implemented'); },
    Authed: false,
    DeAuthenticate: () => { throw new Error('DeAuthenticate not implemented'); }
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
    const [authed, setAuthed] = React.useState<boolean>(false);

    return (
        <AuthContext.Provider value={{
            apiPath,
            localSaveToken,
            localDeleteToken,
            localGetToken,
            authenticate: async (email: signinProps['email'], password: signinProps['password']) => {
                try {
                    const response = await authenticate({ apiPath, email, password, localSaveToken, localGetToken });

                    if (!response.token && !response.message) {
                        return { message: 'Something went wrong' };
                    }

                    if (response.message) {
                        return response;
                    }

                    localSaveToken(response.token || '');
                    setAuthed(true);
                    return response;
                } catch (error) {
                    return { message: 'An error occurred during authentication' };
                }
            },
            authedRequest: async (apiUrl: string, type: 'GET' | 'POST', data?: any) => {
                try {
                    const token = await localGetToken();

                    if (!token) {
                        return { message: 'Not authenticated' } as authRequestDeny;
                    }

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

                    setAuthed(true);
                    return response.data;
                } catch (error) {
                    return { message: 'An unexpected error occurred' };
                }
            },
            isAuthed: async () => {
                try {
                    const token = await localGetToken();
                    if (!token) {
                        return false;
                    }
                    if (token === '') {
                        return false;
                    }
                    setAuthed(true);
                    return true;
                } catch (error) {
                    return false;
                }
            },
            setAuthed,
            Authed: authed,
            DeAuthenticate: async () => {
                try {
                    await localDeleteToken();
                    setAuthed(false);
                    return true;
                } catch (error) {
                    return false;
                }
            }
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
