import { mijnui } from "@mijn-ui/react-theme"
import { createPreset } from "fumadocs-ui/tailwind-plugin"
import { withTV } from "tailwind-variants/dist/transformer.js"
import animationPlugin from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default withTV({
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./view/**/*.{ts,tsx}",
    "./examples/**/*.{ts,tsx,html}",
    "./content/**/*.{md,mdx}",
    "./blocks/**/*.{ts,tsx}",

    // I don't know why this path isn't working in production, so I have to include it this way for development and production
    // just a workaround for now, needs to address this later
    "../../node_modules/fumadocs-ui/dist/**/*.js",
    "./node_modules/@mijn-ui/**/dist/*.js",
    "./node_modules/fumadocs-ui/dist/**/*.js",
  ],
  presets: [createPreset({ cssPrefix: "fd", addGlobalColors: false })],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem",
      },

      borderRadius: {
        default: "0.25rem",
      },

      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [animationPlugin, mijnui({})], // !need to update the doucmentation for this
})
