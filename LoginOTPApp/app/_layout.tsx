import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="error" />
        <Stack.Screen name="signup" />
        {/* Removida a rota OTP */}
      </Stack>
    </AuthProvider>
  );
}