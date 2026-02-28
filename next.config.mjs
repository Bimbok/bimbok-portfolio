/** @type {import('next').NextConfig} */
const envAllowedOrigins = process.env.NEXT_ALLOWED_DEV_ORIGINS
  ? process.env.NEXT_ALLOWED_DEV_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
  : []

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    "http://192.168.29.213:3000",
    "http://localhost:3000",
    ...envAllowedOrigins,
  ],
}

export default nextConfig
