import * as React from "react"
import { UnstyledProps, createTVUnstyledSlots } from "@mijn-ui/react-core"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { LoaderCircleIcon } from "@mijn-ui/shared-icons"
import { ButtonVariantProps, buttonStyles } from "@mijn-ui/react-theme"

export type ButtonProps = React.ComponentPropsWithRef<"button"> &
  ButtonVariantProps & {
    asChild?: boolean
    loading?: boolean
  } & UnstyledProps

const Button = ({
  unstyled,
  className,
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
      className={base({ className })}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <LoaderCircleIcon className={icon()} />}
      <Slottable>{loading ? "Loading..." : children}</Slottable>
    </Component>
  )
}

export { Button }
