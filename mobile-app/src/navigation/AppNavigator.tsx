// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/MainApp/HomeScreen';
// import SettingsScreen from '../screens/MainApp/SettingsScreen';
import {Text, View} from 'react-native';

type AppTabParamList = {
  Home: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={() => <View><Text>HOME</Text></View>} />
    <Tab.Screen name="Settings" component={() => <View><Text>SETTINGS</Text></View>} />
    {/* Add more tabs/screens as needed */}
  </Tab.Navigator>
);

export default AppNavigator;
