import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const Test = () => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-1 items-center justify-center bg-gray-100')}>
      <Text style={tailwind('text-2xl font-bold text-blue-600')}>
        Tailwind CSS Test
      </Text>
      <Text style={tailwind('mt-4 text-lg text-gray-800')}>
        This is a simple test of Tailwind styles in React Native!
      </Text>
      <Button title="Press Me" onPress={() => alert('Button Pressed!')} />
    </View>
  );
};

export default Test;
