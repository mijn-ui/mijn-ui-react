import type { Options } from "tsup"

export const baseConfig: Options = {
  entry: ["src/index.ts"],
  format: "esm",
  clean: true,
  dts: true,
  target: "esnext",
  outDir: "./dist",
}

export const componentConfig: Options = {
  ...baseConfig,
  metafile: true,
  external: ["tailwindcss"],
  tsconfig: "./tsconfig.build.json",
}
