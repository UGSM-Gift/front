/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cloudfront.ugsm.co.kr'],
  },
}

module.exports = nextConfig
