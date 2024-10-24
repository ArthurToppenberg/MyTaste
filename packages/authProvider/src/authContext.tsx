import React, { createContext, useContext, useEffect, useState } from 'react';
/*
    authenticate
    unAuthenticate
    token -> only return string else null
*/
export const AuthContext = createContext({
    logout: () => {},
    token: null as string | null,
    updateToken: (token: string) => {},
});

export interface AuthProviderProps {
    children: React.ReactNode;
    saveToken: (token: string) => void;
    removeToken: () => void;
    getToken: () => string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, saveToken, removeToken, getToken }) => {
    const [token, setToken] = useState<string | null>(null);

    const logout = () => {
        removeToken();
        setToken(null);
        updateToken('');
    };

    const updateToken = (token: string) => {
        saveToken(token);
        setToken(token);
    };

    useEffect(() => {
        const token = getToken();
        if(token){
            updateToken(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{logout, token, updateToken }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);