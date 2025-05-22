import { theme } from '@/styles/theme';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Back } from './Back';
import { PhotoUploader } from './PhotoUploader';

type ButtonProps = {
  type?: 'primary' | 'error' | 'custom';
  shape?: 'rounded' | 'circle' | 'default';
} & TouchableOpacity['props'];

export const Button = ({ children, type = 'primary', shape = 'default', disabled, ...rest }: ButtonProps) => {
  const style =
    type === 'custom'
      ? [styles.button, rest.style]
      : [styles.button, styles[type], styles[shape], disabled && styles.disabled, rest.style];

  return (
    <TouchableOpacity
      {...rest}
      style={style}
      disabled={disabled}
    >
      {type === 'custom' ? children : <Text style={[styles.text, disabled && styles.disabledText]}>{children}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  default: {
    borderRadius: 4
  },
  circle: {
    borderRadius: 100
  },
  rounded: {
    borderRadius: 64
  },
  primary: {
    backgroundColor: theme.colors.primary[300]
  },
  error: {
    backgroundColor: theme.colors.functional.error.main
  },
  success: {
    backgroundColor: theme.colors.functional.success.main
  },
  text: {
    color: theme.colors.neutral[100],
    fontWeight: 'bold',
    fontSize: 14
  },
  disabled: {
    backgroundColor: theme.colors.neutral[400]
  },
  disabledText: {
    color: theme.colors.neutral[300]
  }
});

Button.Back = Back;
Button.PhotoUploader = PhotoUploader;
