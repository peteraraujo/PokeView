module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // ...other rules
    'react/no-unstable-nested-components': [
      'warn', // or 'error'
      { allowAsProps: true }
    ],
  },
};
