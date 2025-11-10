import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: "pub-98f892d1c83a418e8c664394f07a063c.r2.dev",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
