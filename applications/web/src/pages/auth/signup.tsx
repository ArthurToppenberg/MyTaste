import React, { useState } from 'react';
import { Input, Button, Spacer, Card} from '@nextui-org/react';
import DefaultLayout from '@/layouts/defaultLayout';
import { signupProps } from '../api/auth/signup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuthContext } from '@packages/authProvider';
import { signinResponse } from '@packages/authProvider';

const SignUp: React.FC = () => {
    const router = useRouter();
    const { authenticate } = useAuthContext();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignUp = () => {
        // Add signup logic here
        console.log('Signup attempt:', { email, name, phone, password, confirmPassword });
    
        // Validation checks
        if (!email || !name || !phone || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
    
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        //check email is an valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setError('Email is not valid.');
            return;
        }
    
        setLoading(true);
        setError('');
    
        //make axio api call here
        const apiPath = '/api/auth/signup';
        const data: signupProps = {
            email,
            name,
            phoneNumber: phone,
            password,
        };
    
        axios.post(apiPath, data)
            .then((response) => {
                autoLogin().then((succses) => {
                    if(succses){
                        router.push('/protected/dashboard');
                    }else{
                        router.push('/auth/login');
                    }
                });
            })
            .catch((error) => {
                console.error(error.message);
                setError('An error occurred. Please try again.');
            }).finally(() => {
                setLoading(false);
            });
    };

    const autoLogin = async ():Promise<boolean> => {
        const response: signinResponse = await authenticate(email, password);
        if(response.message){
            return false;
        }

        if(response.token){
            return true;
        }

        return false;
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
                        type="text"
                        color="default"
                        label="Name"
                        isRequired
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
                        isRequired
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
        '@media (max-width: 600px)': {
            width: '100%',
        },
    },
    heading: {
        textAlign: 'center' as const,
        fontSize: '24px' as const,
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
    errorText: {
        textAlign: 'center' as const,
        color: 'red',
    },
};

export default SignUp;
