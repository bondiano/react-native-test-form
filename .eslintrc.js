const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';

module.exports = {
  extends: ['airbnb'],
  plugins: [
    'react',
    'react-native',
    'react-hooks',
  ],
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'no-use-before-define': OFF,
    'react/jsx-filename-extension': OFF,
    'react/prop-types': OFF,
    'import/prefer-default-export': OFF,
    'react-hooks/exhaustive-deps': WARN,
    'react-native/no-unused-styles': ERROR,
    'react-native/split-platform-components': ERROR,
    'react-native/no-inline-styles': ERROR,
    'react-native/no-raw-text': ERROR,
    'react-native/no-single-element-style-arrays': ERROR,
    'react/jsx-props-no-spreading': OFF,
  },
  globals: {
    fetch: true,
  },
};
