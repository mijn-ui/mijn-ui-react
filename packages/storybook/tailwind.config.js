import animationPlugin from "tailwindcss-animate"

import { mijnui } from "@mijn-ui/react-theme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "../components/*/src/**/*.{js,jsx,ts,tsx}",
    "../components/*/stories/**/*.{js,jsx,ts,tsx}",
    "../theme/src/**/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [animationPlugin, mijnui()],
  theme: {
    extend: {
      width: {
        xl: "36rem",
      },
    },
  },
}
