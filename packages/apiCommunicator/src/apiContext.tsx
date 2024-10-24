import React, { createContext, useContext, useMemo } from "react";

import { useAuthContext } from "@packages/authProvider";

// Import the interactions
import Login, { LoginProps, LoginResponse } from "./interactions/login";
import Signup, { SignupProps, SignupResponse } from "./interactions/signup";
import Account, { AccountProps, AccountResponse } from "./interactions/account";

interface ApiProviderProps {
    children: React.ReactNode;
    apiUrl: string;
}

/**
 * Create the context and provider for the API
 * This context will provide the functions to interact with the API
 * and the token to authenticate the requests
 * 
 * Routes which require authenticated token are labled with _auth_
 * All _auth_ routes also return a new token which should be used for the next request
 */
const ApiContext = createContext({
    api_login: (props: LoginProps) => Promise.resolve({} as LoginResponse),
    api_signup: (props: SignupProps) => Promise.resolve({} as SignupResponse),
    api_auth_account: (props: AccountProps) => Promise.resolve({} as AccountResponse),
});

const ApiProvider = ({ children, apiUrl }: ApiProviderProps) => {

    const { token, updateToken } = useAuthContext();

    // Define the functions to be passed to the context value
    const login = (props: LoginProps) => Login({ apiUrl, token: token, updateToken, props });
    const signup = (props: SignupProps) => Signup({ apiUrl, token: token, updateToken, props });
    const account = (props: AccountProps) => Account({ apiUrl, token: token, updateToken, props });

    // Memoize the context value to avoid unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            api_login: login,
            api_signup: signup,
            api_auth_account: account,
        }),
        [apiUrl, token] // Depend on apiUrl and token to update when either changes
    );

    return (
        <ApiContext.Provider value={contextValue}>
            {children}
        </ApiContext.Provider>
    );
};

// Custom hook to use the ApiContext
export const useApiContext = () => useContext(ApiContext);

export { ApiProvider };
