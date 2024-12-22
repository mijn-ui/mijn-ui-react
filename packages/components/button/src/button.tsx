import * as React from "react"
import {
  UnstyledComponentWithSlots,
  UnstyledProps,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { LoaderCircleIcon } from "@mijn-ui/shared-icons"
import {
  ButtonSlots,
  ButtonVariantProps,
  buttonStyles,
} from "@mijn-ui/react-theme"
import { cn } from "@mijn-ui/react-utilities"

type ButtonBaseProps = UnstyledComponentWithSlots<ButtonSlots> &
  React.ComponentPropsWithRef<"button">

export type ButtonProps = ButtonBaseProps &
  ButtonVariantProps & {
    asChild?: boolean
    loading?: boolean
  } & UnstyledProps

const Button = ({
  unstyled,
  className,
  classNames,
  color,
  variant,
  size,
  radius,
  loading,
  disabled,
  asChild = false,
  children,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button"
  const styles = buttonStyles({ color, variant, size, radius })
  const { base, icon } = createTVUnstyledSlots(styles, unstyled)

  return (
    <Component
      className={base({ className: cn(classNames?.base, className) })}
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
