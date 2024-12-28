import withInterceptStdout from 'next-intercept-stdout';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default withInterceptStdout(nextConfig, (text) => (text.includes('Duplicate atom key') ? '' : text));
