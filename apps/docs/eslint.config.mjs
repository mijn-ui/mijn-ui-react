import next from "eslint-config-custom/next"

export default [
  {
    ignores: [
      "dist",
      "node_modules",
      ".next/",
      "out/",
      ".source",
      "next.config.mjs",
      "postcss.config.js",
    ],
  },
  ...next,
  {
    rules: {
      "no-console": "off",
    },
  },
]
