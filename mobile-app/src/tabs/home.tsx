import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/default';

export default function Home() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Image style={styles.image} source={require('../assets/electriske.jpg')} />
      </View>
    );
  }