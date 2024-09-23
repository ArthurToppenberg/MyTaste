import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TailwindProvider } from 'tailwind-rn';
import utilities from './tailwind.json'; // Import the generated JSON
import Test from './src/components/test';

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Test />
      </View>
    </TailwindProvider>
  );
}
