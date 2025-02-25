const runtimeCaching = require('next-pwa/cache');
// import withInterceptStdout from 'next-intercept-stdout';
// import withPWA from 'next-pwa';

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disableDevLogs: true,
  // buildExcludes: [/middleware-manifest.json$/],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['hotel-job-connect.s3.amazonaws.com', 'pds.saramin.co.kr', 'cdn.hotel-job-connect.com'],
    // loader: 'custom',
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hotel-job-connect.com',
        pathname: '/resources/resume/profile/**',
      },
      {
        protocol: 'https',
        hostname: 'd202cjflxkflxp.cloudfront.net',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/v1/upload/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     },
  //   ];
  // },
};

module.exports = withPWA(nextConfig);
