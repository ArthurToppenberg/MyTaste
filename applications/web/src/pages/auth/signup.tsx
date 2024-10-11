import React, { useState } from 'react';
import { Input, Button, Spacer, Card } from '@nextui-org/react';
import Fonts from '@/styles/fonts.module.css';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        // Add signup logic here
        console.log('Signup attempt:', { email, name, phone, password, confirmPassword });
        setLoading(true);
    };

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <h3 style={styles.heading}>Sign Up</h3>
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
                    type="text"
                    color="default"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <Spacer y={1} />
                <Input
                    labelPlacement="inside"
                    type="tel"
                    color="default"
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <Input
                    labelPlacement="inside"
                    type="password"
                    color="default"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                />
                <Spacer y={1} />
                <Button
                    onClick={handleSignUp}
                    size="lg"
                    color="primary"
                    variant="bordered"
                    isLoading={loading}
                    style={styles.button}
                >
                    Sign Up
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
        textAlign: 'center' as 'center',
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

export default SignUp;
