// App.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Main from './src/pages/main';
import Authentication from './src/pages/authentication';

import { AuthProvider } from './src/utils/authenticationProvider';


export default function App() {
  return (
    <View style={{ flex: 1 }}>  
      <StatusBar style="auto" />     
      <AuthProvider authProviderProps={{notAuthenticated: <Authentication/>}}>
        <Main />
      </AuthProvider>
    </View>
  );
}
