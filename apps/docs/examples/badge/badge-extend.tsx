import { Badge } from "@mijn-ui/react"
import { extendVariants } from "@mijn-ui/react"

export const MyBadge = extendVariants(Badge, {
  variants: {
    // <- modify/add variants
    variant: {
      text: "",
    },
    color: {
      olive:
        "bg-gradient-to-r from-[#84cc16]/20 via-[#84cc16]/70 to-[#84cc16]/20 text-[#000]",
      orange:
        "bg-gradient-to-r from-[#ff8c00]/20 via-[#ff8c00]/70 to-[#ff8c00]/20 text-[#fff]",
      violet:
        "bg-gradient-to-r from-[#8b5cf6]/20 via-[#8b5cf6]/70 to-[#8b5cf6]/20 text-[#fff]",
    },
    size: {
      xs: "px-1 h-4 text-xs",
      md: "px-3 h-6 text-sm",
      xl: "px-5 h-10 text-lg",
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    color: "olive",
    size: "xl",
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      variant: "ghost",
      color: "olive",
      class:
        "!bg-clip-text !text-transparent from-[#84cc16]/30 via-[#84cc16] to-[#84cc16]/30",
    },
  ],
})
