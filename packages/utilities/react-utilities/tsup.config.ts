import { preserveDirectivesPlugin } from "esbuild-plugin-preserve-directives"
import { defineConfig } from "tsup"
import { baseConfig } from "tsup-config"

export default defineConfig({
  ...baseConfig,
  esbuildPlugins: [
    preserveDirectivesPlugin({
      directives: ["use client", "use strict"],
      include: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
    }),
  ],
  entry: ["src"],
})
