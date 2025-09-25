import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"], // allow external images from picsum.photos
  },
  reactStrictMode: true,
};

export default nextConfig;