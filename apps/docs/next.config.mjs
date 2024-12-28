import createBundleAnalyzer from "@next/bundle-analyzer"
import { createMDX } from "fumadocs-mdx/next"

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */

const config = withAnalyzer({
  output: "standalone",
  reactStrictMode: true,
  basePath: "/react",
  redirects: async () => [
    {
      source: "/",
      destination: "/react",
      basePath: false,
      permanent: true,
    },
  ],
  assetPrefix: "/react",
  swcMinify: true,
  assetPrefix: "/react",
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev }) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      })
    }
    // Important: return the modified config
    return config
  },

  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    webpackMemoryOptimizations: true,
    serverSourceMaps: false,
    swcMinify: true,
  },
})

const withMDX = createMDX()

export default withMDX(config)
