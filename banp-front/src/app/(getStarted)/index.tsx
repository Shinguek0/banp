import React from 'react';
import { ImageBackground, ImageSourcePropType, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';

import { Button } from '@/components/Button';
import { theme } from '@/styles/theme';

import { useFonts, Viga_400Regular } from '@expo-google-fonts/viga';

import Logo from '@/assets/logo.svg';

const GetStarted = () => {
  const backgroundImg: ImageSourcePropType = require('@/assets/images/get-started-background.png');

  let [fontsLoaded, fontError] = useFonts({
    Viga: Viga_400Regular
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.bgImg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Logo
              width={42}
              height={42}
            />
            <Text style={styles.logoText}>Banp!</Text>
          </View>
          <View style={styles.mainContent}>
            <Text style={styles.slogan}>Best place to find your duo or team.</Text>
            <Button onPress={() => router.push('/signUp')}>Get Started</Button>
            {/* <Button
              type="error"
              onPress={() => router.push('/_sitemap')}
            >
              GO TO SITEMAP
            </Button> */}
            <Text style={styles.signIn}>
              Already have an account?{' '}
              <Link
                href="/signIn"
                style={styles.link}
              >
                <Text>Sign in</Text>
              </Link>
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <LinearGradient
        colors={['#FFFFFF00', '#000']}
        style={styles.overlay}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 56,
    zIndex: 2
  },
  bgImg: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    gap: 36,
    paddingBottom: 56
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 8
  },
  logoText: {
    fontFamily: 'Viga',
    fontSize: 32,
    color: theme.colors.neutral[100]
  },
  mainContent: {
    alignItems: 'center',
    gap: 20,
    width: '100%'
  },
  slogan: {
    fontSize: 16,
    marginBottom: 13,
    color: theme.colors.neutral[100]
  },
  signIn: {
    fontSize: 16,
    color: theme.colors.neutral[100]
  },
  link: {
    fontSize: 16,
    marginBottom: 20,
    color: theme.colors.primary[300],
    textDecorationLine: 'underline'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '60%',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  }
});

export default GetStarted;
