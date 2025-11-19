import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { UnstyledComponentWithSlots } from "@mijn-ui/react-core"
import { LoaderCircleIcon } from "@mijn-ui/shared-icons"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const buttonStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    icon: "size-5 animate-spin text-current",
  },
  variants: {
    variant: {
      default:
        "bg-bg-default-alt text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 shadow-xs border focus-visible:ring-offset-2 ",
      primary:
        "bg-bg-brand text-on-bg-brand hover:bg-bg-brand/80 focus-visible:ring-outline-brand active:bg-bg-brand/70 shadow-xs",
      danger:
        "bg-bg-danger text-on-bg-danger hover:bg-bg-danger/80 focus-visible:ring-outline-danger shadow-xs active:bg-bg-danger/70",
      ghost:
        "text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 focus-visible:ring-offset-2",
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
    variant: "default",
    size: "md",
    iconOnly: false,
  },
  compoundVariants: [
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
  React.ComponentPropsWithRef<"button"> & {
    asChild?: boolean
    loading?: boolean
  }

export type ButtonProps = ButtonBaseProps & ButtonVariantProps

const Button = ({
  unstyled,
  className,
  classNames,
  variant,
  size,
  iconOnly,
  loading,
  disabled,
  asChild = false,
  children,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button"
  const styles = buttonStyles({ variant, size, iconOnly })
  const { base, icon } = createTVUnstyledSlots(styles, unstyled)

  return (
    <Component
      className={base({ className: cnBase(classNames?.base, className) })}
      disabled={loading || disabled}
      {...props}
    >
      {loading && (
        <LoaderCircleIcon className={icon({ className: classNames?.icon })} />
      )}
      <Slottable>{loading ? "Loading..." : children}</Slottable>
    </Component>
  )
}

export { Button }
