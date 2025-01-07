import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"
import { colorVariants } from "../utils/variants"

const buttonStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-1 text-small transition-colors duration-200 ease-in-out active:brightness-90 disabled:pointer-events-none disabled:opacity-disabled disabled:brightness-75",
    icon: "mr-2 size-5 animate-spin text-current",
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
    radius: {
      none: "rounded-none",
      sm: "rounded-small",
      md: "rounded-medium",
      lg: "rounded-large",
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
      outlined: "border-small border-current",
      ghost: "",
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
        base: [colorVariants.filled.default],
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
    {
      variant: "filled",
      class: {
        base: "hover:opacity-hover",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    color: "default",
    radius: "md",
    size: "md",
  },
})

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
export type ButtonSlots = keyof ReturnType<typeof buttonStyles>
export { buttonStyles }
