import { VariantProps } from "tailwind-variants"

import { colorVariants } from "../utils"
import { tv } from "../utils/tv"

const badgeStyles = tv({
  slots: {
    base: "focus:ring-ring inline-flex items-center px-2.5 py-0.5 text-tiny font-semibold transition-colors focus:outline-none focus:ring-2",
  },
  variants: {
    color: {
      primary: "",
      secondary: "",
      accent: "",
      muted: "",
      danger: "",
    },
    variant: {
      filled: "",
      outlined: "border-small border-current",
      text: "bg-transparent",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-small",
      md: "rounded-medium",
      lg: "rounded-large",
      full: "rounded-full",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.primary,
          "hover:bg-primary hover:text-primary-text",
        ],
      },
    },
    {
      color: "secondary",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.secondary,
          "hover:bg-secondary hover:text-secondary-text",
        ],
      },
    },
    {
      color: "accent",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.accent,
          "hover:bg-accent hover:text-accent-text",
        ],
      },
    },
    {
      color: "muted",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.muted,
          "hover:bg-muted hover:text-muted-text",
        ],
      },
    },
    {
      color: "danger",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.danger,
          "hover:bg-danger hover:text-danger-filled-text",
        ],
      },
    },

    /* ---------------------------------- Ghost --------------------------------- */
    {
      color: "primary",
      variant: "text",
      class: {
        base: [
          colorVariants.ghost.primary,
          "hover:bg-primary hover:text-primary-text",
        ],
      },
    },
    {
      color: "accent",
      variant: "text",
      class: {
        base: [colorVariants.ghost.accent, "hover:bg-accent"],
      },
    },
    {
      color: "muted",
      variant: "text",
      class: {
        base: [colorVariants.ghost.muted, "hover:bg-muted"],
      },
    },
    {
      color: "secondary",
      variant: "text",
      class: {
        base: [
          colorVariants.ghost.secondary,
          "hover:bg-secondary hover:text-secondary-text",
        ],
      },
    },
    {
      color: "danger",
      variant: "text",
      class: {
        base: [
          colorVariants.ghost.danger,
          "hover:bg-danger hover:text-danger-filled-text",
        ],
      },
    },

    /* --------------------------------- Filled --------------------------------- */
    {
      color: "primary",
      variant: "filled",
      class: {
        base: [colorVariants.filled.primary],
      },
    },
    {
      color: "secondary",
      variant: "filled",
      class: {
        base: [colorVariants.filled.secondary],
      },
    },
    {
      color: "accent",
      variant: "filled",
      class: {
        base: [colorVariants.filled.accent],
      },
    },
    {
      color: "muted",
      variant: "filled",
      class: {
        base: [colorVariants.filled.muted],
      },
    },
    {
      color: "danger",
      variant: "filled",
      class: {
        base: [colorVariants.filled.danger],
      },
    },
    {
      variant: "filled",
      class: {
        base: "hover:opacity-hover",
      },
    },
  ],
  defaultVariants: {
    color: "primary",
    variant: "filled",
    radius: "full",
  },
})

export type BadgeVariantsProps = VariantProps<typeof badgeStyles>
export type BadgeSlots = keyof ReturnType<typeof badgeStyles>

export { badgeStyles }
