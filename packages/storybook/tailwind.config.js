import { mijnui } from "@mijn-ui/react-theme"
import animationPlugin from "tailwindcss-animate"

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
      borderRadius: {
        "2xs": "var(--radius-2xs)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-base)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        "3xl": "var(--shadow-3xl)",
      },
      colors: {
        background: "hsl(var(--background))",
        "background-alt": "hsl(var(--background-alt))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        "border-secondary": "hsl(var(--border-secondary))",

        muted: "hsl(var(--muted))",
        "muted-alt": "hsl(var(--muted-alt))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        "border-muted": "hsl(var(--border-muted))",

        inverse: "hsl(var(--inverse))",
        "inverse-foreground": "hsl(var(--inverse-foreground))",
        "border-inverse": "hsl(var(--border-inverse))",

        primary: "hsl(var(--primary))",
        "primary-subtle": "hsl(var(--primary-subtle))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "primary-foreground-subtle": "hsl(var(--primary-foreground-subtle))",
        "primary-emphasis": "hsl(var(--primary-emphasis))",
        "border-primary": "hsl(var(--border-primary))",
        "border-primary-subtle": "hsl(var(--border-primary-subtle))",

        success: "hsl(var(--success))",
        "success-subtle": "hsl(var(--success-subtle))",
        "success-foreground": "hsl(var(--success-foreground))",
        "success-foreground-subtle": "hsl(var(--success-foreground-subtle))",
        "success-emphasis": "hsl(var(--success-emphasis))",
        "border-success": "hsl(var(--border-success))",
        "border-success-subtle": "hsl(var(--border-success-subtle))",

        "warning-foreground": "hsl(var(--warning-foreground))",
        "warning-foreground-subtle": "hsl(var(--warning-foreground-subtle))",
        "warning-emphasis": "hsl(var(--warning-emphasis))",
        warning: "hsl(var(--warning))",
        "warning-subtle": "hsl(var(--warning-subtle))",
        "border-warning": "hsl(var(--border-warning))",
        "border-warning-subtle": "hsl(var(--border-warning-subtle))",

        danger: "hsl(var(--danger))",
        "danger-subtle": "hsl(var(--danger-subtle))",
        "danger-foreground": "hsl(var(--danger-foreground))",
        "danger-foreground-subtle": "hsl(var(--danger-foreground-subtle))",
        "danger-emphasis": "hsl(var(--danger-emphasis))",
        "border-danger": "hsl(var(--border-danger))",
        "border-danger-subtle": "hsl(var(--border-danger-subtle))",
      },
    },
  },
}
