/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sacredshaadi.com',
        port: '',
        pathname: '/images/shadi_logo%20copy.png'
      }
    ],
    domains: ['utfs.io']
  }
};

module.exports = nextConfig;
