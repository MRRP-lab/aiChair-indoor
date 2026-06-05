module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/step-definitions/**/*.steps.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(' + [
      'react-native',
      '@react-native',
      'expo',
      '@expo',
      'jest-cucumber',
      '@cucumber',
      'uuid',
    ].join('|') + '))'
  ],
};