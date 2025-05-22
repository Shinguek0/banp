import { AuthProvider } from '@/contexts/AuthContext';
import { toastConfig } from '@/styles/toastConfig';
import { Stack } from 'expo-router';

import Toast from 'react-native-toast-message';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(getStarted)" />
        <Stack.Screen name="(setup)" />
        <Stack.Screen name="(banp)" />
      </Stack>
      <Toast config={toastConfig} />
    </AuthProvider>
  );
};

export default RootLayout;
