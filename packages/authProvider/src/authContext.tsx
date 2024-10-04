import * as AuthService from './authService';
import React, { createContext, useEffect, useContext } from 'react';

// Interface for the context
export interface IAuthContext {
    localSaveToken: (token: string) => void;
    localDeleteToken: () => boolean;
    localGetToken: () => string;
    signin: (props: AuthService.singinProps) => Promise<AuthService.singinResponse>;
}

// Default context values
export const AuthContext = createContext<IAuthContext>({
    localSaveToken: (token: string) => { throw new Error('localSaveToken not implemented'); },
    localDeleteToken: () => { throw new Error('localDeleteToken not implemented'); },
    localGetToken: () => { throw new Error('localGetToken not implemented'); },
    signin: async (props: AuthService.singinProps) => { throw new Error('signin not implemented'); }
});

// Interface for AuthProvider props
interface AuthProviderProps {
    localSaveToken: IAuthContext['localSaveToken'];
    localDeleteToken: IAuthContext['localDeleteToken'];
    localGetToken: IAuthContext['localGetToken'];
    children: React.ReactNode;
}

// AuthProvider component
export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({localSaveToken, localDeleteToken, localGetToken, children }) => {
    useEffect(() => {
        const token = localGetToken();
        if (token !== '' && token !== null) {
            localSaveToken(token);
        }
    }, [localGetToken, localSaveToken]);

    return (
        <AuthContext.Provider value={{
            localSaveToken,
            localDeleteToken,
            localGetToken,
            signin: async (props: AuthService.singinProps) => {
                const response = await AuthService.signin(props.email, props.password);

                if (!response.token && !response.message) {
                    return { message: 'Something went wrong' };
                }

                if (response.message) {
                    return response;
                }

                localSaveToken(response.token || '');
                return response;
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
