import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@packages/authProvider';
import { Analytics } from "@vercel/analytics/react";
import '@/styles/globals.css';
import Providers from '@/utils/client/providers';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
    const [apiPath, setApiPath] = useState<string | null>(null);

    useEffect(() => {
        // Ensure that this only runs on the client side
        setApiPath(`${window.location.origin}/api`);
    }, []);

    if (!apiPath) {
        // While the API path is being determined, you can return null or a loading screen
        return null; // or a loading spinner
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
                <Component {...pageProps} />
                <Analytics />
            </AuthProvider>
        </Providers>
    );
}

export default MyApp;
