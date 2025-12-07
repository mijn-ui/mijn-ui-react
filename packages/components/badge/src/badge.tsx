import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"

const badgeStyles = tv({
  slots: {
    base: "focus-visible:ring-offset-bg-default flex items-center gap-1 px-1 py-0.5 text-xs font-semibold outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  },
  variants: {
    color: {
      default: "",
      brand: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
      inverse: "",
    },
    variant: {
      filled: "",
      outlined: "",
      ghost: "",
      subtle: "",
      light: "",
    },
    // variant: {
    //   default:
    //     "bg-bg-default-alt text-fg-default border-outline-default hover:bg-bg-default-alt/80 active:bg-bg-default-alt/70 focus-visible:ring-outline-brand shadow-xs border",
    //   "default-subtle":
    //     "bg-bg-secondary text-fg-default border-outline-default hover:bg-bg-secondary/80 active:bg-bg-secondary/70 focus-visible:ring-outline-brand shadow-xs border",
    //   primary:
    //     "bg-bg-brand text-on-bg-brand hover:bg-bg-brand/80 active:bg-bg-brand/70 focus-visible:ring-outline-brand",
    //   "primary-subtle":
    //     "border-outline-brand-subtle bg-bg-brand-subtle text-on-bg-brand-subtle hover:bg-bg-brand-subtle/80 active:bg-bg-brand-subtle/70 focus-visible:ring-outline-brand-subtle border",
    //   success:
    //     "bg-bg-success text-on-bg-success hover:bg-bg-success/80 active:bg-bg-success/70 focus-visible:ring-outline-success",
    //   "success-subtle":
    //     "border-outline-success-subtle bg-bg-success-subtle text-on-bg-success-subtle hover:bg-bg-success-subtle/80 active:bg-bg-success-subtle/70 focus-visible:ring-outline-success-subtle border",
    //   warning:
    //     "bg-bg-warning text-on-bg-warning hover:bg-bg-warning/80 active:bg-bg-warning/70 focus-visible:ring-warning",
    //   "warning-subtle":
    //     "border-outline-warning-subtle bg-bg-warning-subtle text-on-bg-warning-subtle hover:bg-bg-warning-subtle/80 active:bg-bg-warning-subtle/70 focus-visible:ring-warning-subtle border",
    //   danger:
    //     "bg-bg-danger text-on-bg-danger hover:bg-bg-danger/80 active:bg-bg-danger/70 focus-visible:ring-outline-danger",
    //   "danger-subtle":
    //     "border-outline-danger-subtle bg-bg-danger-subtle text-on-bg-danger-subtle hover:bg-bg-danger-subtle/80 active:bg-bg-danger-subtle/70 focus-visible:ring-outline-danger-subtle border",
    // },
    radius: {
      default: "rounded-sm",
      full: "rounded-full",
    },
  },

  defaultVariants: {
    size: "md",
    variant: "filled",
    radius: "default",
  },
  compoundVariants: [
    // filled / colors
    {
      variant: "filled",
      color: "default",
      className:
        "bg-bg-default-alt text-fg-default hover:bg-bg-accent focus-visible:ring-outline-brand active:bg-bg-accent/70 shadow-xs border focus-visible:ring-offset-2 ",
    },
    {
      variant: "filled",
      color: "brand",
      className:
        "bg-bg-brand text-on-bg-brand hover:bg-bg-brand/80 focus-visible:ring-outline-brand active:bg-bg-brand/70 shadow-xs",
    },
    {
      variant: "filled",
      color: "secondary",
      className:
        "bg-bg-secondary text-fg-secondary shadow-xs hover:bg-bg-accent focus-visible:ring-outline-brand focus-visible:ring-offset-2 active:bg-bg-accent/70",
    },
    {
      variant: "filled",
      color: "success",
      className:
        "bg-bg-success text-on-bg-success hover:bg-bg-success/80 focus-visible:ring-outline-success shadow-xs active:bg-bg-success/70",
    },
    {
      variant: "filled",
      color: "warning",
      className:
        "bg-bg-warning text-on-bg-warning hover:bg-bg-warning/80 focus-visible:ring-outline-warning shadow-xs active:bg-bg-warning/70",
    },
    {
      variant: "filled",
      color: "danger",
      className:
        "bg-bg-danger text-on-bg-danger hover:bg-bg-danger/80 focus-visible:ring-outline-danger shadow-xs active:bg-bg-danger/70",
    },
    {
      variant: "filled",
      color: "inverse",
      className:
        "bg-bg-inverse text-fg-inverse shadow-xs hover:bg-bg-inverse/80 focus-visible:ring-outline-inverse active:bg-bg-inverse/70",
    },

    // outlined / colors
    {
      variant: "outlined",
      color: "default",
      className:
        "border bg-transparent text-fg-default hover:bg-bg-accent focus-visible:ring-outline-brand active:bg-bg-accent/70",
    },
    {
      variant: "outlined",
      color: "brand",
      className:
        "border border-outline-brand bg-transparent text-fg-brand hover:bg-bg-brand hover:text-on-bg-brand focus-visible:ring-outline-brand active:bg-bg-brand/70",
    },
    {
      variant: "outlined",
      color: "secondary",
      className:
        "border border-outline-secondary bg-transparent text-fg-secondary hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70",
    },
    {
      variant: "outlined",
      color: "success",
      className:
        "border border-outline-success bg-transparent text-fg-success hover:bg-bg-success hover:text-on-bg-success focus-visible:ring-outline-success active:bg-bg-success/70",
    },
    {
      variant: "outlined",
      color: "warning",
      className:
        "border border-outline-warning bg-transparent text-fg-warning hover:bg-bg-warning hover:text-on-bg-warning focus-visible:ring-outline-warning active:bg-bg-warning/70",
    },
    {
      variant: "outlined",
      color: "danger",
      className:
        "border border-outline-danger bg-transparent text-fg-danger hover:bg-bg-danger hover:text-on-bg-danger focus-visible:ring-outline-danger active:bg-bg-danger/70",
    },
    {
      variant: "outlined",
      color: "inverse",
      className:
        "bg-transparent border border-outline-inverse text-bg-inverse shadow-xs hover:bg-bg-inverse focus-visible:ring-outline-inverse active:bg-bg-inverse/70 hover:text-fg-inverse",
    },

    // subtle / colors
    {
      variant: "subtle",
      color: "default",
      className:
        "border border-outline-default text-fg-default shadow-sm bg-bg-accent/20 hover:bg-bg-accent focus-visible:ring-outline-brand active:bg-bg-accent/70",
    },
    {
      variant: "subtle",
      color: "brand",
      className:
        "border border-outline-brand-subtle text-on-bg-brand-subtle bg-bg-brand-subtle hover:bg-bg-brand hover:text-on-bg-brand focus-visible:ring-outline-brand",
    },
    {
      variant: "subtle",
      color: "secondary",
      className:
        "border border-outline-secondary text-fg-secondary shadow-sm bg-bg-secondary/40 hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70",
    },
    {
      variant: "subtle",
      color: "success",
      className:
        "border border-outline-success-subtle text-on-bg-success-subtle bg-bg-success-subtle hover:bg-bg-success hover:text-on-bg-success focus-visible:ring-outline-success",
    },
    {
      variant: "subtle",
      color: "warning",
      className:
        "border border-outline-warning-subtle text-on-bg-warning-subtle bg-bg-warning-subtle hover:bg-bg-warning hover:text-on-bg-warning focus-visible:ring-outline-warning",
    },
    {
      variant: "subtle",
      color: "danger",
      className:
        "border border-outline-danger-subtle text-on-bg-danger-subtle bg-bg-danger-subtle hover:bg-bg-danger hover:text-on-bg-danger focus-visible:ring-outline-danger",
    },
    {
      variant: "subtle",
      color: "inverse",
      className:
        "border border-outline-inverse text-bg-inverse bg-bg-inverse/20 hover:bg-bg-inverse hover:text-fg-inverse focus-visible:ring-outline-inverse",
    },

    // ghost / colors
    {
      variant: "ghost",
      color: "default",
      className:
        "text-fg-default hover:bg-bg-accent focus-visible:ring-outline-brand active:bg-bg-accent/70",
    },
    {
      variant: "ghost",
      color: "brand",
      className:
        "text-fg-brand hover:bg-bg-brand hover:text-on-bg-brand focus-visible:ring-outline-brand active:bg-bg-brand/70",
    },
    {
      variant: "ghost",
      color: "secondary",
      className:
        "text-fg-secondary hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70",
    },
    {
      variant: "ghost",
      color: "success",
      className:
        "text-fg-success hover:bg-bg-success hover:text-on-bg-success focus-visible:ring-outline-success active:bg-bg-success/70",
    },
    {
      variant: "ghost",
      color: "warning",
      className:
        "text-fg-warning hover:bg-bg-warning hover:text-on-bg-warning focus-visible:ring-outline-warning active:bg-bg-warning/70",
    },
    {
      variant: "ghost",
      color: "danger",
      className:
        "text-fg-danger hover:bg-bg-danger hover:text-on-bg-danger focus-visible:ring-outline-danger active:bg-bg-danger/70",
    },
    {
      variant: "ghost",
      color: "inverse",
      className:
        "text-bg-inverse hover:bg-bg-inverse hover:text-fg-inverse focus-visible:ring-outline-inverse",
    },

    // light / colors
    {
      variant: "light",
      color: "default",
      className:
        "text-fg-default hover:bg-bg-accent/20 focus-visible:ring-outline-brand hover:shadow-sm active:bg-bg-accent/10",
    },
    {
      variant: "light",
      color: "brand",
      className:
        "text-fg-brand hover:bg-bg-brand-subtle hover:text-on-bg-brand-subtle focus-visible:ring-outline-brand active:bg-bg-brand-subtle/90",
    },
    {
      variant: "light",
      color: "secondary",
      className:
        "text-fg-secondary hover:bg-bg-secondary/20 hover:shadow-sm focus-visible:ring-outline-brand active:bg-bg-secondary/10",
    },
    {
      variant: "light",
      color: "success",
      className:
        "text-fg-success hover:bg-bg-success-subtle hover:text-on-bg-success-subtle focus-visible:ring-outline-success active:bg-bg-success-subtle/90",
    },
    {
      variant: "light",
      color: "warning",
      className:
        "text-fg-warning hover:bg-bg-warning-subtle hover:text-on-bg-warning-subtle focus-visible:ring-outline-warning active:bg-bg-warning-subtle/90",
    },
    {
      variant: "light",
      color: "danger",
      className:
        "text-fg-danger hover:bg-bg-danger-subtle hover:text-on-bg-danger-subtle focus-visible:ring-outline-danger active:bg-bg-danger-subtle/90",
    },
    {
      variant: "light",
      color: "inverse",
      className:
        "text-bg-inverse hover:bg-bg-inverse/20 focus-visible:ring-outline-inverse active:bg-bg-inverse/10 ",
    },

    {
      iconOnly: true,
      size: "sm",
      class: {
        base: "size-8",
      },
    },
    {
      iconOnly: true,
      size: "md",
      class: {
        base: "size-9",
      },
    },
    {
      iconOnly: true,
      size: "lg",
      class: {
        base: "size-12",
      },
    },
  ],
})

export type BadgeVariantsProps = VariantProps<typeof badgeStyles>
export type BadgeSlots = keyof ReturnType<typeof badgeStyles>
export { badgeStyles }

/* -------------------------------------------------------------------------- */

export type BadgeProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> &
  BadgeVariantsProps & { unstyled?: boolean }

const Badge = ({
  color,
  unstyled,
  className,
  variant,
  radius,
  ...props
}: BadgeProps) => {
  const styles = badgeStyles({ variant, color, radius })
  const { base } = createTVUnstyledSlots(styles, unstyled)

  return <div data-slot="badge" className={base({ className })} {...props} />
}

export { Badge }
