import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Providers from '@/utils/client/providers';
import React from 'react';

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
            <Component {...pageProps} />
        </Providers>
    );
}

export default MyApp;
