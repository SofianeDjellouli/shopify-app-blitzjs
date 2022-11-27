module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'unused-imports'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    // "comma-dangle": ["error", "always-multiline"],
    '@typescript-eslint/no-shadow': [
      'error',
      {
        allow: ['cb'],
      },
    ],
    '@typescript-eslint/no-use-before-define': ['error'],
    eqeqeq: ['error', 'smart'],
    'no-console': ['error'],
    'no-restricted-globals': [
      'error',
      'addEventListener',
      'blur',
      'close',
      'closed',
      'confirm',
      'defaultStatus',
      'event',
      'external',
      'defaultstatus',
      'find',
      'focus',
      'frameElement',
      'frames',
      'history',
      'innerHeight',
      'innerWidth',
      'length',
      'location',
      'locationbar',
      'menubar',
      'moveBy',
      'moveTo',
      'name',
      'onblur',
      'onerror',
      'onfocus',
      'onload',
      'onresize',
      'onunload',
      'open',
      'opener',
      'opera',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'parent',
      'print',
      'removeEventListener',
      'resizeBy',
      'resizeTo',
      'screen',
      'screenLeft',
      'screenTop',
      'screenX',
      'screenY',
      'scroll',
      'scrollbars',
      'scrollBy',
      'scrollTo',
      'scrollX',
      'scrollY',
      'self',
      'status',
      'statusbar',
      'stop',
      'toolbar',
      'top',
    ],
    'no-shadow': 'off',
    // note you must disable the base rule as it can report incorrect errors
    //https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916
    'no-use-before-define': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: '*',
      },
      {
        blankLine: 'never',
        next: 'import',
        prev: '*',
      },
      {
        blankLine: 'any',
        next: ['case', 'export'],
        prev: ['case', 'export'],
      },
    ],
    'react/jsx-newline': ['error'],
    'prefer-promise-reject-errors': ['error'],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/prop-types': ['off'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/consistent-type-imports': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      // https://github.com/yannickcr/eslint-plugin-react/issues/1955
      version: '999.999.999',
    },
  },
}