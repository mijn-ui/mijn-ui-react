import { VariantProps } from "tailwind-variants"
import { disabledClasses, focusVisibleClasses } from "../utils/classes"
import { tv } from "../utils/tv"
import { colorVariants } from "../utils/variants"

const buttonStyles = tv({
  slots: {
    base: [
      "inline-flex items-center justify-center gap-1 transition-colors duration-200 ease-in-out active:brightness-90",
      ...disabledClasses,
      ...focusVisibleClasses,
    ],
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
      xs: "text-small h-8 px-2",
      sm: "text-small h-9 px-3",
      md: "text-small h-10 px-3.5",
      lg: "text-medium h-11 px-5",
      xl: "text-medium h-12 px-6",
    },
    variant: {
      filled: "",
      outlined: "border-small border-current",
      ghost: "",
      subtle: "",
    },
    iconOnly: {
      true: "px-0 gap-0",
      false: "",
    },
  },
  defaultVariants: {
    variant: "filled",
    color: "default",
    radius: "md",
    size: "md",
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
      variant: ["filled", "subtle"],
      class: {
        base: "hover:opacity-hover",
      },
    },

    /* --------------------------------- Icon Only --------------------------------- */
    {
      iconOnly: true,
      size: "xs",
      class: {
        base: "size-8",
      },
    },
    {
      iconOnly: true,
      size: "sm",
      class: {
        base: "size-9",
      },
    },
    {
      iconOnly: true,
      size: "md",
      class: {
        base: "size-10",
      },
    },
    {
      iconOnly: true,
      size: "lg",
      class: {
        base: "size-11",
      },
    },
    {
      iconOnly: true,
      size: "xl",
      class: {
        base: "size-12",
      },
    },
  ],
})

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
export type ButtonSlots = keyof ReturnType<typeof buttonStyles>
export { buttonStyles }
