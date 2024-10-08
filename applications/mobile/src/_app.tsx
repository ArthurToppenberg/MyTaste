import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '@mytaste/auth-provider';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { ActivityIndicator, View } from 'react-native'; // For loading spinner
import { loadFonts } from './utils/loadFonts'; // Import the loadFonts utility

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAllResources = async () => {
      await loadFonts(); // Load fonts
      setFontsLoaded(true); // Set font loaded state to true
    };
    loadAllResources();
  }, []);

  // Function to save token to AsyncStorage
  const localSaveToken = async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  // Function to delete token from AsyncStorage
  const localDeleteToken = async (): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem('authToken');
      return true;
    } catch (error) {
      console.error('Failed to delete token:', error);
      return false;
    }
  };

  // Function to get token from AsyncStorage
  const localGetToken = async (): Promise<string> => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token === null) {
        return '';
      }
      return token;
    } catch (error) {
      console.error('Failed to get token:', error);
      throw error;
    }
  };

  // Show loading spinner until fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthProvider
      apiPath={'https://my-taste-phi.vercel.app/api'}
      localSaveToken={localSaveToken}
      localDeleteToken={localDeleteToken}
      localGetToken={localGetToken}
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
