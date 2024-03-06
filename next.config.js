/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
  },
  images: { unoptimized: true },
  reactStrictMode: false,
}
module.exports = nextConfig
