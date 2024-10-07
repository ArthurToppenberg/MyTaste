import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '@mytaste/auth-provider';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
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

  return (
    <AuthProvider
      apiPath={'http://192.168.0.42:3000/api'}
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
