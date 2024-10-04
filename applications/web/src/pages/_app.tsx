import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@packages/authProvider';
import { Analytics } from "@vercel/analytics/react";

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
        <AuthProvider
            apiPath={apiPath}
            localSaveToken={(token: string) => {
                localStorage.setItem('token', token);
            }}
            localDeleteToken={() => {
                localStorage.removeItem('token');
                return true;
            }}
            localGetToken={() => {
                return localStorage.getItem('token') || '';
            }}
        >
            <Component {...pageProps} />
            <Analytics />
        </AuthProvider>
    );
}

export default MyApp;
