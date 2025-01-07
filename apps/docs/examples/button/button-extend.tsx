import * as React from "react"

import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import {
  buttonStyles,
  cn,
  tv,
  UnstyledComponentWithSlots,
  VariantProps,
} from "@mijn-ui/react-theme"
import { LoaderCircleIcon } from "@mijn-ui/shared-icons"
import { Slot, Slottable } from "@radix-ui/react-slot"

// Create custom button styles by extending the default styles
// using the tailwind-variants (tv) function from @mijn-ui/react-theme.
// [!code ++]
const customButtonStyles = tv({
  // [!code ++]
  extend: buttonStyles,
  // [!code ++]
  variants: {
    // [!code ++]
    color: {
      olive: "", // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
  // [!code ++]
  compoundVariants: [
    // [!code ++]
    {
      // [!code ++]
      color: "olive", // [!code ++]
      variant: "filled", // [!code ++]
      // [!code ++]
      class: {
        base: "bg-[#BEF264] text-[#000000]", // [!code ++]
        icon: "text-[#000000]", // [!code ++]
      }, // [!code ++]
    }, // [!code ++]
    // ... add more compound variants here [!code ++]
  ], // [!code ++]
}) // [!code ++]

// define the customButtonStyles slots and variants type
type CustomButtonSlots = keyof ReturnType<typeof customButtonStyles> // [!code ++]
type CustomButtonVariants = VariantProps<typeof customButtonStyles> // [!code ++]

// [!code --]
// export type ButtonBaseProps = UnstyledComponentWithSlots<ButtonSlots> &
export type ButtonBaseProps = UnstyledComponentWithSlots<CustomButtonSlots> & // [!code ++]
  React.ComponentPropsWithRef<"button"> & {
    asChild?: boolean
    loading?: boolean
  }

// [!code --]
// export type ButtonProps = ButtonBaseProps & ButtonVariantProps
export type ButtonProps = ButtonBaseProps & CustomButtonVariants // [!code ++]

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
  const styles = customButtonStyles({ color, variant, size, radius }) // [!code ++]
  // [!code --]
  // const styles = buttonStyles({ color, variant, size, radius })
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
