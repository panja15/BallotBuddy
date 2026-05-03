// file: next.config.js

/** @type {import('next').NextConfig} */
// NOTE: JSDoc comment above is for IDE hints only — NOT TypeScript

const nextConfig = {
  // App Router is enabled by default in Next.js 14
  // Disabling TypeScript checks entirely (project is JavaScript only)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Allow images from external domains if needed later (ECI assets etc.)
  images: {
    remotePatterns: [],
  },
  output: 'standalone',
};

module.exports = nextConfig;
