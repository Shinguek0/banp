import { theme } from '@/styles/theme';
import { Feather } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

type PhotoUploaderProps = {
  photo: string;
  setPhoto: () => void;
} & TouchableOpacity['props'];

export const PhotoUploader = ({ photo, setPhoto, ...rest }: PhotoUploaderProps) => {
  return (
    <>
      <TouchableOpacity
        {...rest}
        style={styles.container}
        onPress={setPhoto}
      >
        {!photo && (
          <Feather
            name="camera"
            size={32}
            color={theme.colors.neutral[400]}
          />
        )}
        {!!photo && (
          <Image
            source={{ uri: photo }}
            style={styles.photo}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: theme.colors.neutral[400],
    backgroundColor: theme.colors.neutral[500],
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width: 118,
    height: 118,
    borderRadius: 999
  }
});
