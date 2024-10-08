import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AuthNavigatior';

import mainStyle from '../../styles/mainStyle';

const SelectScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<StackParamList>>();

    return (
        <View style={mainStyle.container_top}>
            <Text style={[mainStyle.title, { marginBottom: 80, marginTop: 140 }]}>My Taste</Text>

            <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={mainStyle.button_large}
            >
            <Text style={mainStyle.button_large_text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[mainStyle.button_large]}
            >
            <Text style={mainStyle.button_large_text}>Register</Text>
            </TouchableOpacity>
            <Text style={[mainStyle.text_bottom]}>Welocome to My Taste</Text>
        </View>
    );
};

export default SelectScreen;
