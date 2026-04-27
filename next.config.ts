import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Force Next to treat this folder as the project root even when other lockfiles exist above it.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;

if (process.env.NODE_ENV === 'development') {
  import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev());
}
