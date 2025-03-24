// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sleczgiwuppubjccavne.supabase.co',
        port: '',
        pathname: '/**'
      }
    ],
    formats: ['image/avif', 'image/webp']
  }
};

module.exports = nextConfig;
