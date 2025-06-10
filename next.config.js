/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    swcMinify: true,
  },
  // Enable experimental features if needed
  experimental: {
    // Add experimental features here
  },
  // Configure webpack if needed
  webpack: (config) => {
    // Add webpack configurations here if needed
    return config;
  },
  // Environment variables
  env: {
    // Add environment variables here
  },
  // Add headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
