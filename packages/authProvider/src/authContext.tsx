import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    logout: () => {},
    token: null as string | null,
    updateToken: (token: string) => {},
    loading: true,
});

export interface AuthProviderProps {
    children: React.ReactNode;
    saveToken: (token: string) => void;
    removeToken: () => void;
    getToken: () => string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, saveToken, removeToken, getToken }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        removeToken();
        setToken(null);
        updateToken('');
    };

    const updateToken = (token: string) => {
        if (token === '') {
            logout();
            return;
        }

        const old_token = getToken();
        if (token === old_token) {
            return;
        }

        setToken(token);
        saveToken(token);
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            setToken(token);
        }
        setLoading(false); // Set loading to false once the token is fetched
    }, []);

    return (
        <AuthContext.Provider value={{ logout, token, updateToken, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
