import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { LoaderCircleIcon } from "@mijn-ui/shared-icons"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { VariantProps, tv } from "tailwind-variants"

const buttonStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-1.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    loadingIcon: "size-5 animate-spin text-current",
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
    size: {
      sm: "h-8 rounded-md px-3",
      md: "h-9 rounded-md px-3",
      lg: "h-12 rounded-lg px-4",
    },
    iconOnly: {
      true: "gap-0 px-0",
      false: "",
    },
  },
  defaultVariants: {
    variant: "filled",
    color: "default",
    size: "md",
    iconOnly: false,
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
        "text-fg-default shadow-sm bg-bg-accent/20 hover:bg-bg-accent focus-visible:ring-outline-brand active:bg-bg-accent/70",
    },
    {
      variant: "subtle",
      color: "brand",
      className:
        "text-on-bg-brand-subtle bg-bg-brand-subtle hover:bg-bg-brand hover:text-on-bg-brand focus-visible:ring-outline-brand",
    },
    {
      variant: "subtle",
      color: "secondary",
      className:
        "text-fg-secondary shadow-sm bg-bg-secondary/40 hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70",
    },
    {
      variant: "subtle",
      color: "success",
      className:
        "text-on-bg-success-subtle bg-bg-success-subtle hover:bg-bg-success hover:text-on-bg-success focus-visible:ring-outline-success",
    },
    {
      variant: "subtle",
      color: "warning",
      className:
        "text-on-bg-warning-subtle bg-bg-warning-subtle hover:bg-bg-warning hover:text-on-bg-warning focus-visible:ring-outline-warning",
    },
    {
      variant: "subtle",
      color: "danger",
      className:
        "text-on-bg-danger-subtle bg-bg-danger-subtle hover:bg-bg-danger hover:text-on-bg-danger focus-visible:ring-outline-danger",
    },
    {
      variant: "subtle",
      color: "inverse",
      className:
        "text-bg-inverse bg-bg-inverse/20 hover:bg-bg-inverse hover:text-fg-inverse focus-visible:ring-outline-inverse",
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

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
export type ButtonSlots = keyof ReturnType<typeof buttonStyles>
export { buttonStyles }

/* -------------------------------------------------------------------------- */

export type ButtonBaseProps = UnstyledComponentWithSlots<ButtonSlots> &
  Omit<React.ComponentPropsWithRef<"button">, "color"> & {
    asChild?: boolean
    loading?: boolean
    loadingText?: React.ReactNode
    loadingIcon?: React.ReactNode
  }

export type ButtonProps = ButtonBaseProps & ButtonVariantProps

const Button = ({
  unstyled,
  className,
  classNames,
  variant,
  color,
  size,
  iconOnly,
  loading = false,
  disabled = false,
  asChild = false,
  loadingText = "Loading...",
  loadingIcon,
  children,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button"
  const styles = buttonStyles({ variant, color, size, iconOnly })
  const { base, loadingIcon: loadingIconStyle } = createTVUnstyledSlots(
    styles,
    unstyled,
  )

  return (
    <Component
      data-slot="button"
      className={base({ className: cn(classNames?.base, className) })}
      disabled={loading || disabled}
      {...props}
    >
      {loading &&
        (loadingIcon || (
          <LoaderCircleIcon
            data-slot="button-loading-icon"
            className={loadingIconStyle({ className: classNames?.loadingIcon })}
          />
        ))}
      <Slottable>{loading ? loadingText : children}</Slottable>
    </Component>
  )
}

export { Button }
