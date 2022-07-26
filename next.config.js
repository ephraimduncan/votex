/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["avatars.githubusercontent.com"] },
  async redirects() {
    return [
      {
        source: "/vote",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/admin/dashboard",
        destination: "/admin",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
