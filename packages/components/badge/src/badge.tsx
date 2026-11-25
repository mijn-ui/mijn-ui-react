import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, tv } from "tailwind-variants"

const badgeStyles = tv({
  slots: {
    // `inline-flex` so a badge sits in a line of text. In a flex or grid row
    // it is blockified back to `flex`, so it looks exactly as before there.
    // No hover/active/disabled states: a badge is not a control. The focus
    // ring stays for `asChild` links.
    base: "focus-visible:ring-offset-bg-default inline-flex items-center font-semibold outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2",
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
      // Figma-aligned types
      solid: "",
      tonal: "",
      modern: "",
      // Additional variants
      filled: "",
      outlined: "",
      ghost: "",
      subtle: "",
      light: "",
    },
    radius: {
      default: "rounded-sm",
      pill: "rounded-full",
      full: "rounded-full",
    },
    size: {
      sm: "text-xs gap-1 px-1.5 py-px",
      md: "text-xs gap-1 px-2 py-0.75",
      lg: "py-1.75 px-2.5 text-xs gap-1.5",
    },
  },

  defaultVariants: {
    size: "md",
    variant: "solid",
    color: "default",
    radius: "default",
  },
  compoundVariants: [
    // solid (Figma) = filled
    {
      variant: "solid",
      color: "default",
      className:
        "bg-bg-default-alt text-fg-default focus-visible:ring-outline-brand shadow-xs border focus-visible:ring-offset-2",
    },
    {
      variant: "solid",
      color: "brand",
      className:
        "bg-bg-brand text-on-bg-brand focus-visible:ring-outline-brand shadow-xs",
    },
    {
      variant: "solid",
      color: "secondary",
      className:
        "bg-bg-secondary text-fg-secondary shadow-xs focus-visible:ring-outline-brand focus-visible:ring-offset-2",
    },
    {
      variant: "solid",
      color: "success",
      className:
        "bg-bg-success text-on-bg-success focus-visible:ring-outline-success shadow-xs",
    },
    {
      variant: "solid",
      color: "warning",
      className:
        "bg-bg-warning text-on-bg-warning focus-visible:ring-outline-warning shadow-xs",
    },
    {
      variant: "solid",
      color: "danger",
      className:
        "bg-bg-danger text-on-bg-danger focus-visible:ring-outline-danger shadow-xs",
    },
    {
      variant: "solid",
      color: "inverse",
      className:
        "bg-bg-inverse text-fg-inverse shadow-xs focus-visible:ring-outline-inverse",
    },

    // tonal (Figma) = subtle
    {
      variant: "tonal",
      color: "default",
      className:
        "border border-outline-default text-fg-default shadow-sm bg-bg-accent/20 focus-visible:ring-outline-brand",
    },
    {
      variant: "tonal",
      color: "brand",
      className:
        "border border-outline-brand-subtle text-on-bg-brand-subtle bg-bg-brand-subtle focus-visible:ring-outline-brand",
    },
    {
      variant: "tonal",
      color: "secondary",
      className:
        "border border-outline-secondary text-fg-secondary shadow-sm bg-bg-secondary/40 focus-visible:ring-outline-brand",
    },
    {
      variant: "tonal",
      color: "success",
      className:
        "border border-outline-success-subtle text-on-bg-success-subtle bg-bg-success-subtle focus-visible:ring-outline-success",
    },
    {
      variant: "tonal",
      color: "warning",
      className:
        "border border-outline-warning-subtle text-on-bg-warning-subtle bg-bg-warning-subtle focus-visible:ring-outline-warning",
    },
    {
      variant: "tonal",
      color: "danger",
      className:
        "border border-outline-danger-subtle text-on-bg-danger-subtle bg-bg-danger-subtle focus-visible:ring-outline-danger",
    },
    {
      variant: "tonal",
      color: "inverse",
      className:
        "border border-outline-inverse text-bg-inverse bg-bg-inverse/20 focus-visible:ring-outline-inverse",
    },

    // modern (Figma) = outlined
    {
      variant: "modern",
      color: "default",
      className:
        "border bg-transparent text-fg-default focus-visible:ring-outline-brand",
    },
    {
      variant: "modern",
      color: "brand",
      className:
        "border border-outline-brand bg-transparent text-fg-brand focus-visible:ring-outline-brand",
    },
    {
      variant: "modern",
      color: "secondary",
      className:
        "border border-outline-secondary bg-transparent text-fg-secondary focus-visible:ring-outline-brand",
    },
    {
      variant: "modern",
      color: "success",
      className:
        "border border-outline-success bg-transparent text-fg-success focus-visible:ring-outline-success",
    },
    {
      variant: "modern",
      color: "warning",
      className:
        "border border-outline-warning bg-transparent text-fg-warning focus-visible:ring-outline-warning",
    },
    {
      variant: "modern",
      color: "danger",
      className:
        "border border-outline-danger bg-transparent text-fg-danger focus-visible:ring-outline-danger",
    },
    {
      variant: "modern",
      color: "inverse",
      className:
        "bg-transparent border border-outline-inverse text-bg-inverse shadow-xs focus-visible:ring-outline-inverse",
    },

    // filled / colors
    {
      variant: "filled",
      color: "default",
      className:
        "bg-bg-default-alt text-fg-default focus-visible:ring-outline-brand shadow-xs border focus-visible:ring-offset-2",
    },
    {
      variant: "filled",
      color: "brand",
      className:
        "bg-bg-brand text-on-bg-brand focus-visible:ring-outline-brand shadow-xs",
    },
    {
      variant: "filled",
      color: "secondary",
      className:
        "bg-bg-secondary text-fg-secondary shadow-xs focus-visible:ring-outline-brand focus-visible:ring-offset-2",
    },
    {
      variant: "filled",
      color: "success",
      className:
        "bg-bg-success text-on-bg-success focus-visible:ring-outline-success shadow-xs",
    },
    {
      variant: "filled",
      color: "warning",
      className:
        "bg-bg-warning text-on-bg-warning focus-visible:ring-outline-warning shadow-xs",
    },
    {
      variant: "filled",
      color: "danger",
      className:
        "bg-bg-danger text-on-bg-danger focus-visible:ring-outline-danger shadow-xs",
    },
    {
      variant: "filled",
      color: "inverse",
      className:
        "bg-bg-inverse text-fg-inverse shadow-xs focus-visible:ring-outline-inverse",
    },

    // outlined / colors
    {
      variant: "outlined",
      color: "default",
      className:
        "border bg-transparent text-fg-default focus-visible:ring-outline-brand",
    },
    {
      variant: "outlined",
      color: "brand",
      className:
        "border border-outline-brand bg-transparent text-fg-brand focus-visible:ring-outline-brand",
    },
    {
      variant: "outlined",
      color: "secondary",
      className:
        "border border-outline-secondary bg-transparent text-fg-secondary focus-visible:ring-outline-brand",
    },
    {
      variant: "outlined",
      color: "success",
      className:
        "border border-outline-success bg-transparent text-fg-success focus-visible:ring-outline-success",
    },
    {
      variant: "outlined",
      color: "warning",
      className:
        "border border-outline-warning bg-transparent text-fg-warning focus-visible:ring-outline-warning",
    },
    {
      variant: "outlined",
      color: "danger",
      className:
        "border border-outline-danger bg-transparent text-fg-danger focus-visible:ring-outline-danger",
    },
    {
      variant: "outlined",
      color: "inverse",
      className:
        "bg-transparent border border-outline-inverse text-bg-inverse shadow-xs focus-visible:ring-outline-inverse",
    },

    // subtle / colors
    {
      variant: "subtle",
      color: "default",
      className:
        "border border-outline-default text-fg-default shadow-sm bg-bg-accent/20 focus-visible:ring-outline-brand",
    },
    {
      variant: "subtle",
      color: "brand",
      className:
        "border border-outline-brand-subtle text-on-bg-brand-subtle bg-bg-brand-subtle focus-visible:ring-outline-brand",
    },
    {
      variant: "subtle",
      color: "secondary",
      className:
        "border border-outline-secondary text-fg-secondary shadow-sm bg-bg-secondary/40 focus-visible:ring-outline-brand",
    },
    {
      variant: "subtle",
      color: "success",
      className:
        "border border-outline-success-subtle text-on-bg-success-subtle bg-bg-success-subtle focus-visible:ring-outline-success",
    },
    {
      variant: "subtle",
      color: "warning",
      className:
        "border border-outline-warning-subtle text-on-bg-warning-subtle bg-bg-warning-subtle focus-visible:ring-outline-warning",
    },
    {
      variant: "subtle",
      color: "danger",
      className:
        "border border-outline-danger-subtle text-on-bg-danger-subtle bg-bg-danger-subtle focus-visible:ring-outline-danger",
    },
    {
      variant: "subtle",
      color: "inverse",
      className:
        "border border-outline-inverse text-bg-inverse bg-bg-inverse/20 focus-visible:ring-outline-inverse",
    },

    // ghost / colors
    {
      variant: "ghost",
      color: "default",
      className: "text-fg-default focus-visible:ring-outline-brand",
    },
    {
      variant: "ghost",
      color: "brand",
      className: "text-fg-brand focus-visible:ring-outline-brand",
    },
    {
      variant: "ghost",
      color: "secondary",
      className: "text-fg-secondary focus-visible:ring-outline-brand",
    },
    {
      variant: "ghost",
      color: "success",
      className: "text-fg-success focus-visible:ring-outline-success",
    },
    {
      variant: "ghost",
      color: "warning",
      className: "text-fg-warning focus-visible:ring-outline-warning",
    },
    {
      variant: "ghost",
      color: "danger",
      className: "text-fg-danger focus-visible:ring-outline-danger",
    },
    {
      variant: "ghost",
      color: "inverse",
      className: "text-bg-inverse focus-visible:ring-outline-inverse",
    },

    // light / colors
    {
      variant: "light",
      color: "default",
      className: "text-fg-default focus-visible:ring-outline-brand",
    },
    {
      variant: "light",
      color: "brand",
      className: "text-fg-brand focus-visible:ring-outline-brand",
    },
    {
      variant: "light",
      color: "secondary",
      className: "text-fg-secondary focus-visible:ring-outline-brand",
    },
    {
      variant: "light",
      color: "success",
      className: "text-fg-success focus-visible:ring-outline-success",
    },
    {
      variant: "light",
      color: "warning",
      className: "text-fg-warning focus-visible:ring-outline-warning",
    },
    {
      variant: "light",
      color: "danger",
      className: "text-fg-danger focus-visible:ring-outline-danger",
    },
    {
      variant: "light",
      color: "inverse",
      className: "text-bg-inverse focus-visible:ring-outline-inverse",
    },
  ],
})

export type BadgeVariantsProps = VariantProps<typeof badgeStyles>
export type BadgeSlots = keyof ReturnType<typeof badgeStyles>
export { badgeStyles }

/* -------------------------------------------------------------------------- */

export type BadgeProps = Omit<React.ComponentPropsWithRef<"span">, "color"> &
  BadgeVariantsProps & {
    unstyled?: boolean
    /**
     * Render the badge's styling onto its only child instead of a `<span>` —
     * to make a link or a router `<Link>` look like a badge, say.
     */
    asChild?: boolean
  }

const Badge = ({
  color,
  size,
  unstyled,
  className,
  variant,
  radius,
  asChild = false,
  ...props
}: BadgeProps) => {
  const Component = asChild ? Slot : "span"
  const styles = badgeStyles({ variant, size, color, radius })
  const { base } = createTVUnstyledSlots(styles, unstyled)

  return (
    <Component data-slot="badge" className={base({ className })} {...props} />
  )
}

export { Badge }
