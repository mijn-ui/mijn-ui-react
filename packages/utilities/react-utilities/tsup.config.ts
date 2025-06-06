import { defineConfig } from "tsup"
import { baseConfig } from "tsup-config"

export default defineConfig({
  ...baseConfig,
  banner: { js: '"use client";' },
  entry: ["src"],
})
