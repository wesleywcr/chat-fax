// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel', 'expo-router/babel'],
  };
};
