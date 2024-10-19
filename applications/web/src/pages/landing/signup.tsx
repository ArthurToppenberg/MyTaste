import React, { useState } from 'react';
import { Input, Button, Spacer, Card } from '@nextui-org/react';
import DefaultLayout from '@/pages/landing/_layouts/defaultLayout';
import { useRouter } from 'next/router';
import { useAuthContext } from '@packages/authProvider';
import { useApiContext, ResponseType } from '@packages/apiCommunicator';

const SignUp: React.FC = () => {
    const router = useRouter();
    const { login } = useAuthContext();
    const { api_signup } = useApiContext();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        // Validation checks
        if (!email || !password || !confirmPassword || !firstName || !lastName || !phoneNumber) {
            setError('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError('');

        // Send request to signup endpoint
        const response = await api_signup({ firstName, lastName, phoneNumber, email, password });

        if(response.type === ResponseType.error && response.errorMessage){
            setError(response.errorMessage);
            setLoading(false);
            return;
        }

        if(response.type === ResponseType.ok){
            setLoading(false);
            router.push('/landing/login');
        }

        autoLogin();
    };

    const autoLogin = async () => {
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
                    <h3 style={styles.heading}>Sign Up</h3>
                    <Spacer y={1.5} />
                    {error && (
                        <p color="error" style={styles.errorText}>
                            {error}
                        </p>
                    )}
                    <Spacer y={1} />
                    <Input
                        labelPlacement="inside"
                        type="text"
                        color="default"
                        label="First Name"
                        isRequired
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                    />
                    <Spacer y={1} />
                    <Input
                        labelPlacement="inside"
                        type="text"
                        color="default"
                        label="Last Name"
                        isRequired
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                    />
                    <Spacer y={1} />
                    <Input
                        labelPlacement="inside"
                        type="tel"
                        color="default"
                        label="Phone Number"
                        isRequired
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        fullWidth
                    />
                    <Spacer y={1} />
                    <Input
                        labelPlacement="inside"
                        type="email"
                        color="default"
                        label="Email"
                        isRequired
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
                        isRequired
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
                        isRequired
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
        '@media (maxwidth: 600px)': {
            width: '100%',
        },
    },
    heading: {
        textAlign: 'center' as const,
        fontSize: '24px' as const,
        '@media (maxwidth: 600px)': {
            fontSize: '20px',
        },
    },
    button: {
        width: '100%',
        '@media (maxwidth: 600px)': {
            fontSize: '14px',
        },
    },
    errorText: {
        textAlign: 'center' as const,
        color: 'red',
    },
};

export default SignUp;
