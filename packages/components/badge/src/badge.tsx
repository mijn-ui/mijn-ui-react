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
    variant: {
      default:
        "bg-bg-default-alt text-fg-default border-outline-default hover:bg-bg-default-alt/80 active:bg-bg-default-alt/70 focus-visible:ring-outline-brand shadow-xs border",
      "default-subtle":
        "bg-bg-secondary text-fg-default border-outline-default hover:bg-bg-secondary/80 active:bg-bg-secondary/70 focus-visible:ring-outline-brand shadow-xs border",
      primary:
        "bg-bg-brand text-on-bg-brand hover:bg-bg-brand/80 active:bg-bg-brand/70 focus-visible:ring-outline-brand",
      "primary-subtle":
        "border-outline-brand-subtle bg-bg-brand-subtle text-on-bg-brand-subtle hover:bg-bg-brand-subtle/80 active:bg-bg-brand-subtle/70 focus-visible:ring-outline-brand-subtle border",
      success:
        "bg-bg-success text-on-bg-success hover:bg-bg-success/80 active:bg-bg-success/70 focus-visible:ring-outline-success",
      "success-subtle":
        "border-outline-success-subtle bg-bg-success-subtle text-on-bg-success-subtle hover:bg-bg-success-subtle/80 active:bg-bg-success-subtle/70 focus-visible:ring-outline-success-subtle border",
      warning:
        "bg-bg-warning text-on-bg-warning hover:bg-bg-warning/80 active:bg-bg-warning/70 focus-visible:ring-warning",
      "warning-subtle":
        "border-outline-warning-subtle bg-bg-warning-subtle text-on-bg-warning-subtle hover:bg-bg-warning-subtle/80 active:bg-bg-warning-subtle/70 focus-visible:ring-warning-subtle border",
      danger:
        "bg-bg-danger text-on-bg-danger hover:bg-bg-danger/80 active:bg-bg-danger/70 focus-visible:ring-outline-danger",
      "danger-subtle":
        "border-outline-danger-subtle bg-bg-danger-subtle text-on-bg-danger-subtle hover:bg-bg-danger-subtle/80 active:bg-bg-danger-subtle/70 focus-visible:ring-outline-danger-subtle border",
    },
    radius: {
      default: "rounded-sm",
      full: "rounded-full",
    },
  },

  defaultVariants: {
    size: "md",
    variant: "default",
    radius: "default",
  },
})

export type BadgeVariantsProps = VariantProps<typeof badgeStyles>
export type BadgeSlots = keyof ReturnType<typeof badgeStyles>
export { badgeStyles }

/* -------------------------------------------------------------------------- */

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  BadgeVariantsProps & { unstyled?: boolean }

const Badge = ({
  unstyled,
  className,
  variant,
  radius,
  ...props
}: BadgeProps) => {
  const styles = badgeStyles({ variant, radius })
  const { base } = createTVUnstyledSlots(styles, unstyled)

  return <div data-slot="badge" className={base({ className })} {...props} />
}

export { Badge }
