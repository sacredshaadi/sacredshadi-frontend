/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sacredshaadi.com",
        port: "",
        pathname: "/images/shadi_logo%20copy.png"
      }
    ],
    domains: ["utfs.io", "res.cloudinary.com", "sacredshaadi.com"]
  },
  async redirects() {
    return [
      {
        source: "/vendor",
        destination: "/vendor/dashboard",
        permanent: true
      },
      {
        source: "/home",
        destination: "/",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
