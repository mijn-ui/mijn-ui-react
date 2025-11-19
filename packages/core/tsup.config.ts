import fs from "fs"
import { defineConfig } from "tsup"
import { baseConfig } from "tsup-config"

export default defineConfig({
  ...baseConfig,
  entry: ["src/index.ts"],
  onSuccess: async () => {
    fs.copyFileSync("src/theme.css", "dist/theme.css")
  },
  loader: { ".css": "copy" },
})
