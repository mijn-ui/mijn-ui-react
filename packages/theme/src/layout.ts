import type { LayoutTheme } from "./types"

export const defaultLayout: LayoutTheme = {
  radius: {
    "2xs": "0.125rem", // 2px
    xs: "0.25rem", // 4px
    sm: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.25rem", // 20px
    full: "9999px",
  },
  boxShadow: {
    xs: "0 1px 2px rgba(16, 24, 40, 0.05)",
    sm: "0 1px 3px rgba(16, 24, 40, 0.1), 0 1px 2px rgba(16, 24, 40, 0.06)",
    md: "0 4px 8px rgba(16, 24, 40, 0.1), 0 2px 4px rgba(16, 24, 40, 0.06)",
    lg: "0 12px 16px rgba(16, 24, 40, 0.08), 0 4px 6px rgba(16, 24, 40, 0.03)",
    xl: "0 20px 24px rgba(16, 24, 40, 0.08), 0 8px 8px rgba(16, 24, 40, 0.03)",
    "2xl": "0 24px 48px rgba(16, 24, 40, 0.18)",
    "3xl": "0 32px 64px rgba(16, 24, 40, 0.14)",
  },
}

export const lightLayout: LayoutTheme = {}

export const darkLayout: LayoutTheme = {}
