import React from 'react';
import { ImageBackground, ImageSourcePropType, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { Button } from '@/components/Button';
import { theme } from '@/styles/theme';
import { useFonts, Viga_400Regular } from '@expo-google-fonts/viga';
import Logo from '@/assets/logo.svg';

// Constants
const LOGO_SIZE = 42;
const GRADIENT_OVERLAY_HEIGHT = '60%';
const ROUTES = {
  SIGN_UP: '/signUp',
  SIGN_IN: '/signIn'
} as const;

const GRADIENT_COLORS = ['#FFFFFF00', '#000'] as const;

const APP_TEXT = {
  LOGO: 'Banp!',
  SLOGAN: 'Best place to find your duo or team.',
  GET_STARTED: 'Get Started',
  ALREADY_HAVE_ACCOUNT: 'Already have an account? ',
  SIGN_IN: 'Sign in'
} as const;

// Interfaces
interface LogoSectionProps {
  logoText: string;
}

interface MainContentProps {
  slogan: string;
  onGetStarted: () => void;
}

interface LoaderProps {
  isLoading: boolean;
  hasError: boolean;
}

// Custom Hooks
const useFontLoader = () => {
  const [fontsLoaded, fontError] = useFonts({
    Viga: Viga_400Regular
  });

  const isReady = fontsLoaded || fontError;
  const shouldShowLoader = !isReady;

  return { shouldShowLoader, hasError: !!fontError };
};

const useNavigation = () => {
  const navigateToSignUp = () => {
    router.push(ROUTES.SIGN_UP);
  };

  return { navigateToSignUp };
};

// Components
const Loader: React.FC<LoaderProps> = ({ isLoading, hasError }) => {
  if (!isLoading) return null;
  
  // Could add a proper loading spinner here
  return null;
};

const LogoSection: React.FC<LogoSectionProps> = ({ logoText }) => (
  <View style={styles.logoContainer}>
    <Logo width={LOGO_SIZE} height={LOGO_SIZE} />
    <Text style={styles.logoText}>{logoText}</Text>
  </View>
);

const MainContent: React.FC<MainContentProps> = ({ slogan, onGetStarted }) => (
  <View style={styles.mainContent}>
    <Text style={styles.slogan}>{slogan}</Text>
    <Button onPress={onGetStarted}>
      {APP_TEXT.GET_STARTED}
    </Button>
    <Text style={styles.signIn}>
      {APP_TEXT.ALREADY_HAVE_ACCOUNT}
      <Link href={ROUTES.SIGN_IN} style={styles.link}>
        <Text>{APP_TEXT.SIGN_IN}</Text>
      </Link>
    </Text>
  </View>
);

const BackgroundOverlay: React.FC = () => (
  <LinearGradient
    colors={GRADIENT_COLORS}
    style={styles.overlay}
  />
);

const ContentSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => (
  <View style={styles.content}>
    <LogoSection logoText={APP_TEXT.LOGO} />
    <MainContent 
      slogan={APP_TEXT.SLOGAN} 
      onGetStarted={onGetStarted} 
    />
  </View>
);

const GetStarted = () => {
  const backgroundImg: ImageSourcePropType = require('@/assets/images/get-started-background.png');
  const { shouldShowLoader, hasError } = useFontLoader();
  const { navigateToSignUp } = useNavigation();

  if (shouldShowLoader) {
    return <Loader isLoading={true} hasError={hasError} />;
  }

  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.bgImg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ContentSection onGetStarted={navigateToSignUp} />
      </SafeAreaView>
      <BackgroundOverlay />
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
    gap: 8,
    alignItems: 'center'
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
    color: theme.colors.neutral[100],
    textAlign: 'center'
  },
  signIn: {
    fontSize: 16,
    color: theme.colors.neutral[100],
    textAlign: 'center'
  },
  link: {
    fontSize: 16,
    color: theme.colors.primary[300],
    textDecorationLine: 'underline'
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: GRADIENT_OVERLAY_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  }
});

export default GetStarted;