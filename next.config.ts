import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Optional: enables React strict mode
  swcMinify: true, // Optional: enables the new SWC-based minifier for better performance

  // Your custom configurations can go here
  env: {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_SCOPE: 'openid profile',
    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    AUTH0_POST_LOGOUT_REDIRECT_URI: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  },

  // Specify the domains where images are hosted
  images: {
    domains: [
      'example.com',
      'anotherdomain.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com', // Add GitHub avatar domain here
    ],
  },

  // Enable custom Webpack configuration, if needed
  webpack(config, { isServer }) {
    // Custom Webpack configuration (e.g., for server-side rendering optimizations)
    return config;
  },
};

export default nextConfig;
