import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@acme/ui", "@acme/api", "@acme/typescript-config"],
};

export default nextConfig;
