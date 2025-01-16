import { defineConfig } from "tsup"
import { componentConfig } from "tsup-config"

export default defineConfig({
  ...componentConfig,
  banner: { js: '"use client";' },
})
