import { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { theme } from './theme';

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.functional.success.main }}
      contentContainerStyle={{ backgroundColor: theme.colors.neutral[500] }}
      text1Style={{
        color: theme.colors.neutral[100]
      }}
      text2Style={{
        color: theme.colors.neutral[300]
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.functional.error.main }}
      contentContainerStyle={{ backgroundColor: theme.colors.neutral[500] }}
      text1Style={{
        color: theme.colors.neutral[100]
      }}
      text2Style={{
        color: theme.colors.neutral[300]
      }}
    />
  ),

  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.functional.info.main }}
      contentContainerStyle={{ backgroundColor: theme.colors.neutral[500] }}
      text1Style={{
        color: theme.colors.neutral[100]
      }}
      text2Style={{
        color: theme.colors.neutral[300]
      }}
    />
  ),

  custom: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: theme.colors.primary[300] }}
      contentContainerStyle={{ backgroundColor: theme.colors.neutral[500] }}
      text1Style={{
        color: theme.colors.neutral[100]
      }}
      text2Style={{
        color: theme.colors.neutral[300]
      }}
    />
  )
};
