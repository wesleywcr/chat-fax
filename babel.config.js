module.exports = function (api) {
  api.cache(true);
  // Add the line below (this path is relative from `node_modules/expo-router`)
  process.env.EXPO_ROUTER_APP_ROOT = '../../src/app';

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
      require.resolve('expo-router/babel'),
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@dto': './src/dto',
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@utils': './src/utils',
            '@services': './src/services',
            '@hooks': './src/hooks',
            '@contexts': './src/contexts',
            '@lib': './src/lib',
            '@schemas': './src/schemas',
          },
        },
      ],
    ],
  };
};
