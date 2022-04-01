module.exports = {

  env: {
    browser: true,
    es2021: true,
  },
  extends: './node_modules/eslint-config-hackreactor/index.js',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
};
