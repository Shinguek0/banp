export const defaultErrorMessage = (errorCode: string) => {
  const errors: Record<string, string> = {
    'auth/email-already-in-use': 'Email already in use',
    'auth/invalid-email': 'Invalid email',
    'auth/weak-password': 'Weak password'
  };

  return errors[errorCode] || 'Unknown Error';
};
