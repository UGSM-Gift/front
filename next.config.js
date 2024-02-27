/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cloudfront.ugsm.co.kr'],
  },
}

module.exports = nextConfig
