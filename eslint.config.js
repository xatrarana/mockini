import eslintPluginImport from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: {
      import: eslintPluginImport,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'import/order': ['warn', { 'newlines-between': 'always' }],
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
);
