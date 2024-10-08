import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AuthNavigatior';

import { useAuthContext } from '@mytaste/auth-provider';
import type { signinResponse } from '@mytaste/auth-provider';

import mainStyle from '../../styles/mainStyle';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    const [email, setEmail] = useState<string>('arthur.toppenberg@gmail.com');
    const [password, setPassword] = useState<string>('sommerhus11');

    // const [email, setEmail] = useState<string>();
    // const [password, setPassword] = useState<string>();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { authenticate } = useAuthContext();

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
                    console.log('Token:', signinResponse.token);
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
        <View style={mainStyle.container_center}>
            <Text style={mainStyle.title}>My Taste</Text>

            {errorMessage && <Text style={mainStyle.text_error}>{errorMessage}</Text>}

            <TextInput
                style={mainStyle.input_large}
                placeholder="Email"
                placeholderTextColor={'white'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={mainStyle.input_large}
                placeholder="Password"
                placeholderTextColor={'white'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                onPress={() => handleLogin()}
                style={mainStyle.button_medium_inverted}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="black" />
                ) : (
                    <Text style={mainStyle.button_medium_text_inverted}>Login</Text>
                )}

            </TouchableOpacity>

            <Text
                style={mainStyle.text_footer}
                onPress={() => navigation.navigate('Register')}
            >
                Don't have an account? Sign up.
            </Text>
        </View>
    );
};

export default LoginScreen;