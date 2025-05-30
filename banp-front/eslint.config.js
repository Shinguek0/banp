// eslint.config.js
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat();

export default [
  ...compat.plugins('prettier'),

  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
  prettier,
];
