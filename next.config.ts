import type { NextConfig } from "next";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'steamcommunity-a.akamaihd.net',
      'api.steamapis.com',
      'cdn.steamcommunity.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steamcommunity-a.akamaihd.net',
        pathname: '/economy/image/**',
      },
      {
        protocol: 'https', 
        hostname: 'api.steamapis.com',
        pathname: '/image/item/**',
      },
    ],
  },
};


export default nextConfig;
