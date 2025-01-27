import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,  // Ensures each route ends with a trailing slash (helps with static exports)
  output: 'export',
  images: {
    unoptimized: true,  // Disable image optimization
  }
};

export default nextConfig;
