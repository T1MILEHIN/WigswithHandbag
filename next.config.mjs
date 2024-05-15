/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
    domains: [
      'firebasestorage.googleapis.com',
      'wigandhandbag-1b82e.appspot.com'
    ],
    formats: [
      'image/avif',
      'image/webp',
    ],

  }, 
};

export default nextConfig;
