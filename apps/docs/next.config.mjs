import createBundleAnalyzer from "@next/bundle-analyzer"
import { createMDX } from "fumadocs-mdx/next"

const withAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */

const config = withAnalyzer({
  experimental: {
    reactCompiler: true,
  },
  reactStrictMode: true,
  output: "standalone",
  images: {
    unoptimized: true,
  },
})

const withMDX = createMDX()

export default withMDX(config)
