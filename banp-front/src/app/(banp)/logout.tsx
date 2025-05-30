import { useAuth } from '@/hooks/useAuth'; import { router } from 'expo-router';
import { useEffect } from 'react';
// Constants
const SIGN_IN_ROUTE = '/(getStarted)/signIn';

const Logout = () => {
  const { handleSignOut } = useAuth();
  useEffect(() => {
    const performSignOut = async () => {
      await handleSignOut();
      router.push(SIGN_IN_ROUTE);
    };
    performSignOut();
  }, []);
  return null;
};
export default Logout;

