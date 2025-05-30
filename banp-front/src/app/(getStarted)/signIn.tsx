import { Link, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, type TextInput } from 'react-native';

import { useAuth } from '@/hooks/useAuth';

import Logo from '@/assets/logo.svg';
import { Button, Input } from '@/components';
import { AntDesign } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/styles/theme';

// Constants
const LOGO_SIZE = 42;

const TEXT = {
  welcome: 'Welcome Back!',
  subtitle: 'Please sign in with your credentials',
  email: 'Email',
  password: 'Password',
  signIn: 'Sign in',
  or: 'or',
  googleSignInSoon: 'Sign in with Google (coming soon)',
  noAccount: 'Don’t have an account?',
  signUp: 'Sign up'
};

const ROUTES = {
  home: '/(banp)/home',
  setup: '/(setup)/index',
  signUp: '/signUp'
};

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleSignInWithEmail } = useAuth();
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);

  const navigateAfterSignIn = (response: any) => {
    if (response?.have_account) return router.push(ROUTES.home);
    if (response?.have_account === false) return router.push(ROUTES.setup);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await handleSignInWithEmail({ email, password });
      navigateAfterSignIn(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} color={theme.colors.primary[300]} />

      <View style={[styles.backButton, { top: insets.top + 24, left: insets.left + 16 }]}>
        <Button.Back onPress={router.back} />
      </View>

      <View style={styles.header}>
        <Logo width={LOGO_SIZE} height={LOGO_SIZE} style={styles.logo} />
        <Text style={styles.title}>{TEXT.welcome}</Text>
        <Text style={styles.subtitle}>{TEXT.subtitle}</Text>
      </View>

      <View style={styles.centerInfo}>
        <View style={styles.form}>
          <Input.Text
            placeholder={TEXT.email}
            icon="at-sign"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
            value={email}
            onChangeText={setEmail}
          />
          <Input.Text
            placeholder={TEXT.password}
            icon="lock"
            secureTextEntry
            autoCorrect={false}
            returnKeyType="done"
            value={password}
            onChangeText={setPassword}
            ref={passwordRef}
          />
          <Button onPress={handleSignIn}>{TEXT.signIn}</Button>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{TEXT.or}</Text>
          <View style={styles.dividerLine} />
        </View>

        <View>
          <Button type="custom" style={styles.googleButton} disabled>
            <AntDesign name="google" size={24} color={theme.colors.neutral[200]} />
            <Text style={styles.googleButtonText}>{TEXT.googleSignInSoon}</Text>
          </Button>
        </View>
      </View>

      <View>
        <Text style={styles.signUp}>
          {TEXT.noAccount}{' '}
          <Link href={ROUTES.signUp} style={styles.link}>
            {TEXT.signUp}
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    padding: 24,
    backgroundColor: theme.colors.neutral[600],
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32
  },
  backButton: {
    position: 'absolute'
  },
  header: {
    alignItems: 'center',
    gap: 12
  },
  logo: {
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.neutral[100]
  },
  subtitle: {
    color: theme.colors.neutral[200],
    textAlign: 'center'
  },
  centerInfo: {
    justifyContent: 'center',
    width: '90%',
    gap: 32
  },
  form: {
    gap: 16
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.neutral[400]
  },
  dividerText: {
    color: theme.colors.neutral[400]
  },
  googleButton: {
    backgroundColor: theme.colors.neutral[400],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    gap: 8
  },
  googleButtonText: {
    color: theme.colors.neutral[200],
    fontWeight: 'bold'
  },
  signUp: {
    color: theme.colors.neutral[100]
  },
  link: {
    color: theme.colors.primary[300],
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
});

export default SignIn;