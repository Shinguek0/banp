import { theme } from '@/styles/theme';
import { Feather } from '@expo/vector-icons';
import { ReactNode, forwardRef } from 'react';
import { TextInput as NativeTextInput, StyleSheet, View } from 'react-native';

type TextInputProps = {
  icon?: string;
  customIcon?: ReactNode;
} & NativeTextInput['props'];

export const TextInput = forwardRef<NativeTextInput, TextInputProps>(({ icon, customIcon, children, ...rest }, ref) => {
  return (
    <View style={[styles.container, rest.style]}>
      <NativeTextInput
        {...rest}
        placeholderTextColor={theme.colors.neutral[300]}
        ref={ref}
        style={styles.input}
      >
        {children}
      </NativeTextInput>
      {icon && !customIcon && (
        <Feather
          name={icon as any}
          size={20}
          color={theme.colors.neutral[100]}
          style={styles.icon}
        />
      )}
      {customIcon}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 16,
    paddingLeft: 24,
    paddingRight: 16,
    backgroundColor: theme.colors.neutral[500]
  },
  icon: {
    color: theme.colors.neutral[400],
    paddingLeft: 16
  },
  input: {
    flex: 1,
    color: theme.colors.neutral[100]
  }
});
