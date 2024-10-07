import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AuthNavigatior';

import { useAuthContext } from '@mytaste/auth-provider';
import type { signinResponse } from '@mytaste/auth-provider';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    const [email, setEmail] = useState<string>('arthur.toppenberg@gmail.com');
    const [password, setPassword] = useState<string>('sommerhus11');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { authenticate, localGetToken } = useAuthContext();

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            await authenticate(email, password).then((signinResponse: signinResponse) => {
                if (signinResponse.message) {
                    setErrorMessage(signinResponse.message);
                }
                if (signinResponse.token) {
                    localGetToken().then((token: string) => {
                        console.log('Token:', token);
                    }); 
                }
            }).catch((error) => {
                setErrorMessage('An error occurred during login.');
            });

        } catch (error: any) {
            setErrorMessage('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Login" onPress={handleLogin} />
            )}

            <Text
                style={styles.footerText}
                onPress={() => navigation.navigate('Register')}
            >
                Don't have an account? Sign up.
            </Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 4,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 12,
    },
    footerText: {
        marginTop: 16,
        textAlign: 'center',
        color: 'blue',
    },
});
