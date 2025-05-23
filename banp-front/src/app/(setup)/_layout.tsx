import { useAuth } from '@/hooks/useAuth';
import { Redirect, Stack } from 'expo-router';

const RootLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

export default RootLayout;
