import React, { useState } from 'react';
import { Input, Button, Spacer, Card } from '@nextui-org/react';
import {useAuthContext } from '@packages/authProvider';
import { useRouter } from 'next/router';
import DefaultLayout from "@/pages/landing/layouts/defaultLayout";

import { ResponseType } from '@packages/apiCommunicator';

const Login: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const {login} = useAuthContext();

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        const response = await login(email, password);

        if(response.type === ResponseType.error && response.errorMessage){
            setError(response.errorMessage);
            setLoading(false);
            return;
        }

        if(response.type === ResponseType.ok){
            setLoading(false);
            router.push('/');
        }
    };

    return (
        <DefaultLayout>
            <div style={styles.container}>
                <Card style={styles.card}>
                    <p style={styles.heading}>Login</p>
                    <Spacer y={1.5} />
                    {error && (
                        <p color="error" style={styles.error}>
                            {error}
                        </p>
                    )}
                    <Spacer y={1} />
                    <Input
                        labelPlacement="inside"
                        type="email"
                        color="default"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <Spacer y={1} />
                    <Input
                        labelPlacement="inside"
                        type="password"
                        color="default"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <Spacer y={1} />
                    <Button
                        onClick={handleLogin}
                        size="lg"
                        color="primary"
                        variant="bordered"
                        isLoading={loading}
                        style={styles.button}
                    >
                        Login
                    </Button>
                </Card>
            </div>
        </DefaultLayout>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        padding: '0 20px',
    },
    card: {
        maxWidth: '100%',
        width: '400px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        '@media (maxWidth: 600px)': {
            width: '100%',
        },
    },
    heading: {
        textAlign: 'center' as const,
        fontSize: '24px',
        '@media (maxWidth: 600px)': {
            fontSize: '20px',
        },
    },
    error: {
        textAlign: 'center' as const,
        color: 'red',
    },
    button: {
        width: '100%',
        '@media (maxWidth: 600px)': {
            fontSize: '14px',
        },
    },
};

export default Login;
