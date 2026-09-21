import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optional isolated output for validation when OneDrive locks the dev cache.
  distDir: process.env.SEASILK_BUILD_DIR || ".next",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Default allowed quality is [75]; the hero uses 90 since it's the
    // single largest, most prominent (LCP) image on the page.
    qualities: [75, 90],
  },
};

export default nextConfig;
