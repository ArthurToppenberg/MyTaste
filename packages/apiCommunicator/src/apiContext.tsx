import React, { createContext, useContext, useMemo } from "react";
import { IResponse } from "./interface";
import Login, { LoginProps, LoginResponse } from "./interactions/login";

interface ApiProviderProps {
    children: React.ReactNode;
    apiUrl: string;
}

const ApiContext = createContext({
    set_token: (token: string) => {},
    api_login: (props: LoginProps) => Promise.resolve({} as LoginResponse),
});

const ApiProvider = ({ children, apiUrl }: ApiProviderProps) => {
    const [token, setToken] = React.useState<string | null>(null);

    // Define the login function
    const login = (props: LoginProps) => Login({ apiUrl, token: token, props });

    // Memoize the context value to avoid unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            set_token: setToken, // Expose setToken as set_token
            api_login: login, // Expose login as api_login
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
