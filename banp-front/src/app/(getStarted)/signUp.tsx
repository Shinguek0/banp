import { Link, router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View, type TextInput } from 'react-native';

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
  title: 'Create new account',
  subtitle: 'Get in touch with gamers around you, all for free.',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm password',
  signUp: 'Sign up',
  or: 'or',
  googleSignUpSoon: 'Sign up with Google (coming soon)',
  alreadyAccount: 'Already have an account?',
  signIn: 'Sign in',
  passwordMismatch: 'Passwords do not match',
  passwordMismatchMsg: 'Please make sure your passwords match.'
};

const ROUTES = {
  setup: '/(setup)',
  signIn: '/signIn'
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { handleSignUpWithEmail } = useAuth();
  const insets = useSafeAreaInsets();

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handlePasswordMismatch = () => {
    Alert.alert(TEXT.passwordMismatch, TEXT.passwordMismatchMsg);
  };

  const navigateToSetup = () => {
    router.push(ROUTES.setup);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword || !confirmPassword) {
      return handlePasswordMismatch();
    }

    try {
      setLoading(true);
      const response = await handleSignUpWithEmail({ email, password });
      console.log(response);
      navigateToSetup();
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
        <Text style={styles.title}>{TEXT.title}</Text>
        <Text style={styles.subtitle}>
          {TEXT.subtitle.split(', ')[0]},{'\n'} <Text style={styles.boldText}>{TEXT.subtitle.split(', ')[1]}</Text>
        </Text>
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
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            blurOnSubmit={false}
            value={password}
            onChangeText={setPassword}
            ref={passwordRef}
          />
          <Input.Text
            placeholder={TEXT.confirmPassword}
            icon="alert-circle"
            secureTextEntry
            autoCorrect={false}
            returnKeyType="done"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={{ marginBottom: 24 }}
            ref={confirmPasswordRef}
          />
          <Button onPress={handleSignUp}>{TEXT.signUp}</Button>
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{TEXT.or}</Text>
          <View style={styles.dividerLine} />
        </View>

        <View>
          <Button type="custom" style={styles.googleButton} disabled>
            <AntDesign name="google" size={24} color={theme.colors.neutral[200]} />
            <Text style={styles.googleButtonText}>{TEXT.googleSignUpSoon}</Text>
          </Button>
        </View>
      </View>

      <View>
        <Text style={styles.signIn}>
          {TEXT.alreadyAccount}{' '}
          <Link href={ROUTES.signIn} style={styles.link}>
            {TEXT.signIn}
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  boldText: {
    fontWeight: 'bold'
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
  signIn: {
    color: theme.colors.neutral[100]
  },
  link: {
    color: theme.colors.primary[300],
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  }
});

export default SignUp;