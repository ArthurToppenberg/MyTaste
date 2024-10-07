import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from '../../../packages/authProvider';

export default function App() {
  return (
    <AuthProvider apiPath={''} localSaveToken={function (token: string): void {
      throw new Error('Function not implemented.');
    } } localDeleteToken={function (): boolean {
      throw new Error('Function not implemented.');
    } } localGetToken={function (): string {
      throw new Error('Function not implemented.');
    } }>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
