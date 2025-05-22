import { useAuth } from '@/hooks/useAuth';
import { router } from 'expo-router';
import { useEffect } from 'react';

const Logout = () => {
  const { handleSignOut } = useAuth();

  useEffect(() => {
    const signOut = async () => {
      await handleSignOut();

      router.push('/(getStarted)/signIn');
    };

    signOut();
  }, []);

  return null;
};

export default Logout;
