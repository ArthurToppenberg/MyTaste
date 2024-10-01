import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AuthNavigatior';

import { API_BASE_URL } from '@env';

const SelectScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to My App</Text>
            <Text style={styles.subtitle}>Please choose an option</Text>
            <Text style={styles.subtitle}>Api: {API_BASE_URL}</Text>

            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />

            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
                color="green"
            />
        </View>
    );
};

export default SelectScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonContainer: {
        marginBottom: 16,
    },
});