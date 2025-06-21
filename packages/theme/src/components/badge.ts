import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const badgeStyles = tv({
  slots: {
    base: "focus-visible:ring-offset-background flex items-center gap-1 px-1 py-0.5 text-xs font-semibold outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  },
  variants: {
    variant: {
      default:
        "bg-background-alt text-foreground border-border hover:bg-background-alt/80 active:bg-background-alt/70 focus-visible:ring-primary shadow-xs border",
      "default-subtle":
        "bg-secondary text-foreground border-border hover:bg-secondary/80 active:bg-secondary/70 focus-visible:ring-primary shadow-xs border",
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/70 focus-visible:ring-primary",
      "primary-subtle":
        "border-border-primary-subtle bg-primary-subtle text-primary-foreground-subtle hover:bg-primary-subtle/80 active:bg-primary-subtle/70 focus-visible:ring-primary-subtle border",
      success:
        "bg-success text-success-foreground hover:bg-success/80 active:bg-success/70 focus-visible:ring-success",
      "success-subtle":
        "border-border-success-subtle bg-success-subtle text-success-foreground-subtle hover:bg-success-subtle/80 active:bg-success-subtle/70 focus-visible:ring-success-subtle border",
      warning:
        "bg-warning text-warning-foreground hover:bg-warning/80 active:bg-warning/70 focus-visible:ring-warning",
      "warning-subtle":
        "border-border-warning-subtle bg-warning-subtle text-warning-foreground-subtle hover:bg-warning-subtle/80 active:bg-warning-subtle/70 focus-visible:ring-warning-subtle border",
      danger:
        "bg-danger text-danger-foreground hover:bg-danger/80 active:bg-danger/70 focus-visible:ring-danger",
      "danger-subtle":
        "border-border-danger-subtle bg-danger-subtle text-danger-foreground-subtle hover:bg-danger-subtle/80 active:bg-danger-subtle/70 focus-visible:ring-danger-subtle border",
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
