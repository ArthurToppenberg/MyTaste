// App.tsx
import React from 'react';
import Index from './src/tabs';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function App() {
  return (
    <View style={styles.container}>  
      <StatusBar style="auto" />
      <Index /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
});
