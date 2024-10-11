import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@packages/authProvider';
import { Analytics } from "@vercel/analytics/react";
import '@/styles/globals.css';
import Providers from '@/utils/client/providers';
import React from 'react';
import NavBar from '@/components/navbar';


function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    const [apiPath, setApiPath] = useState<string | null>(null);

    useEffect(() => {
        setApiPath(`${window.location.origin}/api`);
    }, []);

    if (!apiPath) {
        return null;
    }

    return (
        <Providers>
            <AuthProvider
                apiPath={apiPath}
                localSaveToken={(token: string) => {
                    localStorage.setItem('token', token);
                }}
                localDeleteToken={async () => {
                    localStorage.removeItem('token');
                    return true;
                }}
                localGetToken={async () => {
                    return localStorage.getItem('token') || '';
                }}
            >
                <NavBar/>
                <Component {...pageProps} />
                <Analytics />
            </AuthProvider>
        </Providers>
    );
}

export default MyApp;
