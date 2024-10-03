import * as AuthService from './authService';
import React, {createContext, useEffect} from 'react';

export interface IAuthContext{ // interface for the context
    apiPath: string;
    localSaveToken: (token: string) => void;
    localDeleteToken: () => boolean;
    localGetToken: () => string;
    signin: (props: AuthService.singinProps) => Promise<AuthService.singinResponse>;
}

const AuthContext = createContext<IAuthContext>(
    {
        apiPath: '',
        localSaveToken: (token: string) => {throw new Error('localSaveToken not implemented')},
        localDeleteToken: () => {throw new Error('localDeleteToken not implemented')},
        localGetToken: () => {throw new Error('localGetToken not implemented')},
        signin: async (props: AuthService.singinProps) => {throw new Error('signin not implemented') }
    }
);

interface AuthProviderProps { // Props which users needs to define
    apiPath: IAuthContext['apiPath'];
    localSaveToken: IAuthContext['localSaveToken'];
    localDeleteToken: IAuthContext['localDeleteToken'];
    localGetToken: IAuthContext['localGetToken'];
    children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ apiPath, localSaveToken, localDeleteToken, localGetToken, children }) => {    
    useEffect(() => {
        const token = localGetToken();
        if(token !== '' || token !== null){
            localSaveToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            apiPath,
            localSaveToken,
            localDeleteToken,
            localGetToken,
            signin: async (props: AuthService.singinProps) => {
                const response = await AuthService.signin(apiPath, props.email, props.password);

                if(!response.token && !response.message){
                    return {message: 'Something went wrong'};
                }

                if(response.message){
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