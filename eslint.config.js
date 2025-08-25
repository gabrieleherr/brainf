import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-empty-pattern': 'warn',
      'no-lonely-if': 'warn',
    },
    languageOptions: {
      parser: tsParser,
    },
    ignores: ['dist/*', 'build/*', 'node_modules/*'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
  },
]);
