import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com", pathname: "/**" },
      { protocol: "http", hostname: "firebasestorage.googleapis.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
