import type { AppProps } from 'next/app';
import { AuthProvider } from '@packages/authProvider';
import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps: {...pageProps } }: AppProps) {
    return (
        <AuthProvider
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