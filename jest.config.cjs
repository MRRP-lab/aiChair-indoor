module.exports = {
  preset: 'jest-expo',
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