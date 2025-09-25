import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    // This allows production builds to succeed even if ESLint errors are present.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
