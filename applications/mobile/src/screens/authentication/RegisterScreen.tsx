import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AuthNavigatior';

import mainStyle from '../../styles/mainStyle';

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleRegister = () => {
        // Basic validation
        if (!email || !name || !phoneNumber || !password || !repeatPassword) {
            setErrorMessage('Please fill all the fields.');
            return;
        }

        if (password !== repeatPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        // Call registration logic here (API integration, context update, etc.)
        console.log(`Registering with email: ${email}, name: ${name}, phone: ${phoneNumber}`);
        setLoading(false);
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
                placeholder="Name"
                placeholderTextColor={'white'}
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={mainStyle.input_large}
                placeholder="Phone Number"
                placeholderTextColor={'white'}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            <TextInput
                style={mainStyle.input_large}
                placeholder="Password"
                placeholderTextColor={'white'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={mainStyle.input_large}
                placeholder="Repeat Password"
                placeholderTextColor={'white'}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry
            />

            <TouchableOpacity
                onPress={() => handleRegister()}
                style={mainStyle.button_medium_inverted}
            >
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Text style={mainStyle.button_medium_text_inverted}>Register</Text>
                )}
            </TouchableOpacity>

            <Text
                style={mainStyle.text_footer}
                onPress={() => navigation.navigate('Login')}
            >
                Already have an account? Log in.
            </Text>
        </View>
    );
};

export default RegisterScreen;
