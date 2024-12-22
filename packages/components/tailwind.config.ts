/**
 * This Tailwind config is used to enable code completion in the editor.
 * I am not quite sure why Tailwind autocomplete doesn't work, so I'm adding this as a workaround.
 * Note: This is a temporary workaround and will be removed later.
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        xl: "36rem",
      },
    },
  },
}
