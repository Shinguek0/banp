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

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { handleSignUpWithEmail } = useAuth();
  const insets = useSafeAreaInsets();

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    if (password !== confirmPassword || !confirmPassword) {
      // Show error message
      return Alert.alert('Passwords do not match', 'Please make sure your passwords match.');
    }

    try {
      setLoading(true);
      const response = await handleSignUpWithEmail({ email, password });
      console.log(response);

      return router.push('/(setup)');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={loading}
        color={theme.colors.primary[300]}
      />
      <View
        style={[
          styles.backButton,
          {
            top: insets.top + 24,
            left: insets.left + 16
          }
        ]}
      >
        <Button.Back onPress={router.back} />
      </View>
      <View style={styles.header}>
        <Logo
          width={42}
          height={42}
          style={styles.logo}
        />
        <Text style={styles.title}>Create new account</Text>
        <Text style={styles.subtitle}>
          Get in touch with gamers around you, {'\n'} <Text style={styles.boldText}>all for free.</Text>
        </Text>
      </View>
      <View style={styles.centerInfo}>
        <View style={styles.form}>
          <Input.Text
            placeholder="Email"
            icon="at-sign"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input.Text
            placeholder="Password"
            icon="lock"
            secureTextEntry={true}
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            blurOnSubmit={false}
            value={password}
            onChangeText={(text) => setPassword(text)}
            ref={passwordRef}
          />
          <Input.Text
            placeholder="Confirm password"
            icon="alert-circle"
            secureTextEntry={true}
            autoCorrect={false}
            returnKeyType="done"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={{ marginBottom: 24 }}
            ref={confirmPasswordRef}
          />
          <Button onPress={handleSignUp}>Sign up</Button>
        </View>
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>
        <View>
          <Button
            type="custom"
            style={styles.googleButton}
            disabled // until fix google auth
            // onPress={handleSignWithGoogle}
          >
            <AntDesign
              name="google"
              size={24}
              color={theme.colors.neutral[200]}
            />
            <Text style={styles.googleButtonText}>Sign up with Google (coming soon)</Text>
          </Button>
        </View>
      </View>
      <View>
        <Text style={styles.signIn}>
          Already have an account?{' '}
          <Link
            href="/signIn"
            style={styles.link}
          >
            Sign in
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
