import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/rorvig.mp4')} // Path to your local video
        style={styles.video}
        useNativeControls
        isLooping
        isMuted={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 200,
    aspectRatio: 9 / 16,
  },
});
