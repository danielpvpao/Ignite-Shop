import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    domains: [
      'files.stripe.com',
      'via.placeholder.com'
    ],
  }
};

export default nextConfig;
