import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.cast.casino',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'wsrv.nl',
        port: '',
        pathname: '/',
      },
    ],
  },
}

export default nextConfig
