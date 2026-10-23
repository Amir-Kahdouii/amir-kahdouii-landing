import type { NextConfig } from "next";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const normalizedBasePath = rawBasePath.trim().replace(/\/+$/, "");
const basePath =
  normalizedBasePath && normalizedBasePath !== ""
    ? normalizedBasePath.startsWith("/")
      ? normalizedBasePath
      : `/${normalizedBasePath}`
    : undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
