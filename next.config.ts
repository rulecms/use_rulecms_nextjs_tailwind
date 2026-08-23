import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      {
        source: '/widgets/:slug/ssr',
        destination: '/widgets/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
