import { mijnui } from "./src/plugin"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./**/*.{ts,tsx}"],
  plugins: [mijnui()],
}
