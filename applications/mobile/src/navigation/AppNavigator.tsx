// src/navigation/AppNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import HomeScreen from '../screens/main/HomeScreen';
import CreateScreen from '../screens/main/CreateScreen';
import ExploreScreen from '../screens/main/ExploreScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

import mainStyle from '../styles/mainStyle';

type AppTabParamList = {
  Home: undefined;
  Create: undefined;
  Explore: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();
const Stack = createStackNavigator();

const AppTabs: React.FC = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false, // Hide the header for tab screens
      tabBarStyle: {
        backgroundColor: 'black',
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('../assets/images/icons/home.png')}
            style={{ width: 26, height: 26, tintColor: color }}
          />
        ),
      }} />
    <Tab.Screen
      name="Create"
      component={CreateScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('../assets/images/icons/create.png')}
            style={{ width: 26, height: 26, tintColor: color }}
          />
        ),
      }} />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require('../assets/images/icons/explore.png')}
            style={{ width: 26, height: 26, tintColor: color }}
          />
        ),
      }} />
  </Tab.Navigator>
);

type RootStackParamList = {
  AppTabs: undefined;
  Settings: undefined;
};

const AppNavigator: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name=" "
        component={AppTabs}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            color: 'white',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Image
                source={require('../assets/images/icons/settings.png')}
                style={{ width: 26, height: 26, marginRight: 10, tintColor: 'white' }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <Text style={mainStyle.text_header_title}>My Taste</Text>
          ),
        }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
