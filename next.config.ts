import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.toss.im", "res.cloudinary.com"],
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;