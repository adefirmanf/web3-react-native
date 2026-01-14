const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// @ethersproject/shims handles most polyfills, but we need crypto specifically
if (!config.resolver) {
  config.resolver = {};
}

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  crypto: require.resolve('expo-crypto'),
};

// Disable package exports resolution to avoid @noble/hashes warnings
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './global.css' });
