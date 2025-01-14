import { extendVariants } from "@mijn-ui/react"
import { Input } from "@mijn-ui/react"

export const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      stone: {
        // <- add a new color variant

        base: [
          // <- Input element slot
          "bg-zinc-400",
          "text-zinc-800",
          "placeholder:text-zinc-600",
          // dark theme
          "dark:bg-zinc-800",
          "dark:text-zinc-400",
          "dark:placeholder:text-zinc-600",
        ],
      },
    },
    size: {
      xs: {
        wrapper: "",
        base: "h-6 min-h-6 px-1 text-tiny",
      },
      md: {
        wrapper: "",
        base: "h-10 min-h-10 text-small",
      },
      xl: {
        wrapper: "",
        base: "h-14 min-h-14 text-medium",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-small",
      },
      md: {
        base: "rounded-medium",
      },
      lg: {
        base: "rounded-large",
      },
      full: {
        base: "rounded-full",
      },
    },
  },
  defaultVariants: {
    color: "stone",
    radius: "full",
    size: "sm",
  },
})
