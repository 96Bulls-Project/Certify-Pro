/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: 'serverless',
  env: {
    NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
    NEXT_PUBLIC_REDIS_URI: process.env.NEXT_PUBLIC_REDIS_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  }
}

module.exports = nextConfig
