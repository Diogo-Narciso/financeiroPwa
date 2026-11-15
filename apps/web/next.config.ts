import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@portal-difal/shared",
    "@portal-difal/db",
    "@portal-difal/nfe-parser",
    "@portal-difal/classifier",
    "@portal-difal/tax-engine",
  ],
  // Keep pg (and friends) out of the webpack graph for Edge/instrumentation.
  serverExternalPackages: ["pg", "pg-native", "pgpass", "bcryptjs"],
};

export default nextConfig;
