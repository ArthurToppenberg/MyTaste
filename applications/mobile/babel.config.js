module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      'babel-preset-expo',  // Ensure you have this preset for Expo
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            // Add custom aliases if necessary for your monorepo structure
            '@mobile': './apps/mobile',
            '@shared': './packages/shared',
          },
          extensions: ['.tsx', '.ts', '.js', '.json'],
        },
      ],
    ],
  };
};
