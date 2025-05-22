import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components';

import SetupImg from '@/assets/SetupImg.svg';
import { theme } from '@/styles/theme';
import { router } from 'expo-router';

const Setup = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Setup your profile</Text>
        <Text style={styles.subtitle}>We need some of your informations before you can start using the app.</Text>
      </View>
      <View style={styles.imgContainer}>
        <SetupImg
          width={400}
          height={300}
        />
        <Button
          shape="rounded"
          type="primary"
          onPress={() => router.push('/profile')}
        >
          Ok. Let’s start!
        </Button>
      </View>
      <Text style={styles.hint}>Hint: you can customize your profile at any moment!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 64,
    padding: 32,
    backgroundColor: theme.colors.neutral[600],
    gap: 24
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
    gap: 24,
    width: '100%'
  },
  hint: {
    color: theme.colors.neutral[300],
    position: 'absolute',
    bottom: 32
  }
});

export default Setup;
