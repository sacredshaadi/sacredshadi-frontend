/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sacredshaadi.com"
      },
      {
        protocol: "https",
        hostname: "utfs.io"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true
      },
      {
        source: "/vendor",
        destination: "/vendor/dashboard",
        permanent: true
      },
      {
        source: "/home",
        destination: "/",
        permanent: true
      },
      {
        source: "/package-details",
        destination: "/",
        permanent: true
      },
      {
        source: "/search",
        destination: "/",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
