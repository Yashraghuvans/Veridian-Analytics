import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const remotionDir = path.join(__dirname, '.deps/node_modules');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['remotion', '@remotion/player'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      remotion: path.join(remotionDir, 'remotion'),
      '@remotion/player': path.join(remotionDir, '@remotion/player'),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      remotion: './.deps/node_modules/remotion',
      '@remotion/player': './.deps/node_modules/@remotion/player',
    },
  },
};

export default nextConfig;
