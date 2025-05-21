import * as React from 'react';

import { createTVUnstyledSlots } from '@mijn-ui/react-core';
import {
  ButtonSlots,
  buttonStyles,
  ButtonVariantProps,
  cn,
  UnstyledComponentWithSlots,
} from '@mijn-ui/react-theme';
import { LoaderCircleIcon } from '@mijn-ui/shared-icons';
import {
  Slot,
  Slottable,
} from '@radix-ui/react-slot';

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

export { Button };
