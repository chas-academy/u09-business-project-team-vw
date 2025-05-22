import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';


export default defineConfig([
  {
    ignores: ['node_modules', 'dist', 'eslint.config.mjs', 'tsconfig.json']
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'], 
    plugins: { js }, 
    extends: ['js/recommended'],
    linterOptions: { reportUnusedDisableDirectives: true },
  },
  { 
    files: ['**/*.js'], 
    languageOptions: { sourceType: 'commonjs' } 
  },
  { 
    files: ['**/*.{js,mjs,cjs,ts}'], 
    languageOptions: { globals: globals.node } 
  },
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-eval': 'error',
      'no-var' : 'error',
      'require-await' : 'warn',
      'no-return-await' : 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'property'],
          format: ['camelCase'],
          modifiers: ['public'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: ['class', 'interface', 'typeAlias', 'enum'],
          format: ['PascalCase'],
        },
      ]
    }
  }
]);
