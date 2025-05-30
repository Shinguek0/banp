import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components';
import SetupImg from '@/assets/SetupImg.svg';
import { theme } from '@/styles/theme';
import { router } from 'expo-router';

const IMAGE_SIZE = {
  width: 400,
  height: 300
};

const SPACING = {
  paddingTop: 64,
  padding: 32,
  gap: 24,
  hintBottom: 32
};

const TEXT = {
  title: 'Setup your profile',
  subtitle: 'We need some of your informations before you can start using the app.',
  button: 'Ok. Let’s start!',
  hint: 'Hint: you can customize your profile at any moment!'
};

const Setup = () => {
  const navigateToProfile = () => {
    router.push('/profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{TEXT.title}</Text>
        <Text style={styles.subtitle}>{TEXT.subtitle}</Text>
      </View>

      <View style={styles.imgContainer}>
        <SetupImg width={IMAGE_SIZE.width} height={IMAGE_SIZE.height} />
        <Button shape="rounded" type="primary" onPress={navigateToProfile}>
          {TEXT.button}
        </Button>
      </View>

      <Text style={styles.hint}>{TEXT.hint}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.paddingTop,
    padding: SPACING.padding,
    backgroundColor: theme.colors.neutral[600],
    gap: SPACING.gap
  },
  header: {
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: theme.colors.neutral[100]
  },
  subtitle: {
    color: theme.colors.neutral[200],
    textAlign: 'center'
  },
  imgContainer: {
    alignItems: 'center',
    gap: SPACING.gap,
    width: '100%'
  },
  hint: {
    color: theme.colors.neutral[300],
    position: 'absolute',
    bottom: SPACING.hintBottom
  }
});

export default Setup;