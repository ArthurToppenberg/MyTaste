import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AuthNavigatior';

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const handleRegister = () => {
        // Basic validation
        if (!email || !name || !phoneNumber || !password || !repeatPassword) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        if (password !== repeatPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        // Call registration logic here (API integration, context update, etc.)
        console.log(`Registering with email: ${email}, name: ${name}, phone: ${phoneNumber}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

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
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Repeat Password"
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry
            />

            <Button title="Register" onPress={handleRegister} />

            <Text
                style={styles.footerText}
                onPress={() => navigation.navigate('Login')}
            >
                Already have an account? Log in.
            </Text>
        </View>
    );
};

export default RegisterScreen;

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
    footerText: {
        marginTop: 16,
        textAlign: 'center',
        color: 'blue',
    },
});
