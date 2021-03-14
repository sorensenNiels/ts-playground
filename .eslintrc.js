module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020
  },

  plugins: ['import', 'promise', '@typescript-eslint', 'prettier'],

  extends: [
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:promise/recommended'
  ],

  root: true,

  env: {
    node: true,
    jest: true
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  },

  rules: {
    // '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',

    'comma-dangle': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off'
  }
};
