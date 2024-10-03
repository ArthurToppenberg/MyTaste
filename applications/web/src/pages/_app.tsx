import type { AppProps } from 'next/app';
import AuthProvider from "@packages/authProvider";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <AuthProvider
            apiPath={`${process.env.NEXTAUTH_URL}/api`}
            localSaveToken={(token: string) => {
                localStorage.setItem('token', token);
            }}
            localDeleteToken={() => {
                localStorage.removeItem('token');
                return true;
            }}
            localGetToken={() => {
                return localStorage.getItem('token') || '';
            }}>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;