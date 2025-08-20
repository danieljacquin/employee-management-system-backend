const parser = require('@typescript-eslint/parser');
const eslintPluginTS = require('@typescript-eslint/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginPrettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['src/**/*.{ts,js}'],
    ignores: ['dist', 'node_modules'],
    languageOptions: {
      parser: parser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    plugins: {
      '@typescript-eslint': eslintPluginTS,
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
        },
      ],
    },
  },
];
