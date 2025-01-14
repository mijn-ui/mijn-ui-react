import { VariantProps } from "tailwind-variants"
import { colorVariants } from "../utils"
import { tv } from "../utils/tv"

const badgeStyles = tv({
  slots: {
    base: "focus:ring-ring inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2",
  },
  variants: {
    color: {
      default: "",
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      danger: "",
    },
    variant: {
      filled: "",
      outlined: "border-small border-current",
      ghost: "bg-transparent",
      subtle: "",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-small",
      md: "rounded-medium",
      lg: "rounded-large",
      full: "rounded-full",
    },
    size: {
      xs: "px-1.5 py-0.5 text-tiny",
      sm: "px-2 py-0.5 text-small",
      md: "px-2.5 py-1 text-small",
      lg: "px-3 py-1 text-medium",
    },
  },
  compoundVariants: [
    {
      color: "default",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.default,
          "hover:bg-accent hover:text-accent-foreground",
        ],
      },
    },
    {
      color: "primary",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.primary,
          "hover:bg-primary hover:text-primary-foreground",
        ],
      },
    },
    {
      color: "secondary",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.secondary,
          "hover:bg-secondary hover:text-secondary-foreground",
        ],
      },
    },
    {
      color: "success",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.success,
          "hover:bg-success hover:text-success-foreground-filled",
        ],
      },
    },
    {
      color: "info",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.info,
          "hover:bg-info hover:text-info-foreground-filled",
        ],
      },
    },
    {
      color: "warning",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.warning,
          "hover:bg-warning hover:text-warning-foreground-filled",
        ],
      },
    },
    {
      color: "danger",
      variant: "outlined",
      class: {
        base: [
          colorVariants.outlined.danger,
          "hover:bg-danger hover:text-danger-foreground-filled",
        ],
      },
    },

    /* ---------------------------------- Ghost --------------------------------- */
    {
      color: "default",
      variant: "ghost",
      class: {
        base: [
          colorVariants.ghost.default,
          "hover:bg-accent hover:text-accent-foreground",
        ],
      },
    },
    {
      color: "primary",
      variant: "ghost",
      class: {
        base: [
          colorVariants.ghost.primary,
          "hover:bg-primary hover:text-primary-foreground",
        ],
      },
    },
    {
      color: "secondary",
      variant: "ghost",
      class: {
        base: [
          colorVariants.ghost.secondary,
          "hover:bg-secondary hover:text-secondary-foreground",
        ],
      },
    },
    {
      color: "success",
      variant: "ghost",
      class: {
        base: [
          colorVariants.ghost.success,
          "hover:bg-success hover:text-success-foreground-filled",
        ],
      },
    },
    {
      color: "info",
      variant: "ghost",
      class: {
        base: [
          colorVariants.ghost.info,
          "hover:bg-info hover:text-info-foreground-filled",
        ],
      },
    },
    {
      color: "warning",
      variant: "ghost",
      class: {
        base: [
          colorVariants.ghost.warning,
          "hover:bg-warning hover:text-warning-foreground-filled",
        ],
      },
    },
    {
      color: "danger",
      variant: "ghost",
      class: {
        base: [
          colorVariants.ghost.danger,
          "hover:bg-danger hover:text-danger-foreground-filled",
        ],
      },
    },

    /* --------------------------------- Filled --------------------------------- */
    {
      color: "default",
      variant: "filled",
      class: {
        base: [
          colorVariants.filled.default,
          "hover:bg-accent hover:text-accent-foreground shadow-small",
        ],
      },
    },
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
      color: "success",
      variant: "filled",
      class: {
        base: [colorVariants.filled.success],
      },
    },
    {
      color: "info",
      variant: "filled",
      class: {
        base: [colorVariants.filled.info],
      },
    },
    {
      color: "warning",
      variant: "filled",
      class: {
        base: [colorVariants.filled.warning],
      },
    },
    {
      color: "danger",
      variant: "filled",
      class: {
        base: [colorVariants.filled.danger],
      },
    },

    /* --------------------------------- Subtle --------------------------------- */

    {
      color: "default",
      variant: "subtle",
      class: {
        base: colorVariants.subtle.default,
      },
    },
    {
      color: "primary",
      variant: "subtle",
      class: {
        base: colorVariants.subtle.primary,
      },
    },
    {
      color: "secondary",
      variant: "subtle",
      class: {
        base: colorVariants.subtle.secondary,
      },
    },
    {
      color: "success",
      variant: "subtle",
      class: {
        base: colorVariants.subtle.success,
      },
    },
    {
      color: "info",
      variant: "subtle",
      class: {
        base: colorVariants.subtle.info,
      },
    },
    {
      color: "warning",
      variant: "subtle",
      class: {
        base: colorVariants.subtle.warning,
      },
    },
    {
      color: "danger",
      variant: "subtle",
      class: {
        base: colorVariants.subtle.danger,
      },
    },
    {
      variant: ["filled", "subtle"],
      color: ["primary", "secondary", "success", "info", "warning", "danger"],
      class: {
        base: "hover:opacity-hover",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    color: "default",
    variant: "filled",
    radius: "full",
  },
})

export type BadgeVariantsProps = VariantProps<typeof badgeStyles>
export type BadgeSlots = keyof ReturnType<typeof badgeStyles>

export { badgeStyles }
