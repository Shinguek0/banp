import { useAuth } from '@/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';

const RootLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
    </Stack>
  );
};

export default RootLayout;
