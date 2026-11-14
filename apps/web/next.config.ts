import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@portal-difal/shared", "@portal-difal/db", "@portal-difal/nfe-parser", "@portal-difal/classifier"],
};

export default nextConfig;
