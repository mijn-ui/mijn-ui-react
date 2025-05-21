import { extendVariants } from "@mijn-ui/react-core"
import { Input } from "@mijn-ui/react-input"

export const MyInput = extendVariants(Input, {
  variants: {
    // <- modify/add variants
    color: {
      stone: {
        // <- add a new color variant

        input: [
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
        base: "",
        input: "h-6 min-h-6 px-1 text-tiny",
      },
      md: {
        base: "",
        input: "h-10 min-h-10 text-small",
      },
      xl: {
        base: "",
        input: "h-14 min-h-14 text-medium",
      },
    },
    radius: {
      none: {
        input: "rounded-none",
      },
      sm: {
        input: "rounded-small",
      },
      md: {
        input: "rounded-medium",
      },
      lg: {
        input: "rounded-large",
      },
      full: {
        input: "rounded-full",
      },
    },
  },
  defaultVariants: {
    color: "stone",
    radius: "full",
    size: "sm",
  },
})
