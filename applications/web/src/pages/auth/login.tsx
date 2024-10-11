import React, { useState } from 'react';
import { Input, Button, Spacer, Card } from '@nextui-org/react';;

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        // Add login logic here
        console.log('Login attempt:', { email, password });
        setLoading(true);
    };

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <p style={styles.heading}>Login</p>
                <Spacer y={1.5} />
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
        '@media (max-width: 600px)': {
            width: '100%',
        },
    },
    heading: {
        textAlign: 'center' as const,
        fontSize: '24px',
        '@media (max-width: 600px)': {
            fontSize: '20px',
        },
    },
    button: {
        width: '100%',
        '@media (max-width: 600px)': {
            fontSize: '14px',
        },
    },
};

export default Login;
