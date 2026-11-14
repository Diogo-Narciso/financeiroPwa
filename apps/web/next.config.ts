import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@portal-difal/shared", "@portal-difal/db"],
};

export default nextConfig;
