// This is a temporary workaround for the tailwind autocomplete issue.
// The autocomplete doesn't work when trying to define an entry for a directory outside the current directory, for example '../components/**/**.{ts,tsx}'.
// TODO: Find a better solution for this issue.
// This workaround will be removed in the future.

import { mijnui } from "../theme/src/plugin"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./**/*.{ts,tsx}"],
  plugins: [mijnui()],
}
