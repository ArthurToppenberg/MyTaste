import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/default';

export default function Explore() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Explore</Text>
        <Image style={styles.image} source={require('../assets/is.jpg')} />
      </View>
    );
  }