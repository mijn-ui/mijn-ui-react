import { VariantProps, tv } from "tailwind-variants"
import { colorVariants } from "../utils/variants"

const buttonStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-1 text-sm transition-colors duration-200 ease-in-out active:brightness-90 disabled:pointer-events-none disabled:opacity-80 disabled:brightness-75",
    icon: "mr-2 size-5 animate-spin text-current",
  },
  variants: {
    color: {
      primary: {},
      secondary: {},
      accent: {},
      muted: {},
      danger: {},
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    size: {
      sm: "h-9 px-3",
      md: "h-10 px-3",
      lg: "h-11 px-8",
      icon: "size-10",
    },
    variant: {
      filled: "",
      outlined: "border border-current",
      text: "",
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
        base: [colorVariants.filled.primary, "hover:bg-primary/80"],
      },
    },
    {
      color: "secondary",
      variant: "filled",
      class: {
        base: [colorVariants.filled.secondary, "hover:bg-secondary/80"],
      },
    },
    {
      color: "accent",
      variant: "filled",
      class: {
        base: [colorVariants.filled.accent, "hover:bg-accent/80"],
      },
    },
    {
      color: "muted",
      variant: "filled",
      class: {
        base: [colorVariants.filled.muted, "hover:bg-muted/80"],
      },
    },
    {
      color: "danger",
      variant: "filled",
      class: {
        base: [colorVariants.filled.danger, "hover:bg-danger/80"],
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    color: "primary",
    radius: "md",
    size: "md",
  },
})

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
export type ButtonSlots = keyof ReturnType<typeof buttonStyles>
export { buttonStyles }
