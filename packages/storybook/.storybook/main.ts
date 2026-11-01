import type { StorybookConfig } from "@storybook/react-vite"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import { dirname, join } from "path"

const require = createRequire(import.meta.url)

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
// eslint-disable-next-line

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
