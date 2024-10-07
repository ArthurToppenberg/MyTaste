import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SelectScreen from '../screens/authentication/SelectScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';

type StackParamList = {
  Select: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Select" component={SelectScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
export type { StackParamList };
