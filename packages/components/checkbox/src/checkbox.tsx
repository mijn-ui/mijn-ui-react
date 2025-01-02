"use client"

import * as React from 'react';

import { createTVUnstyledSlots } from '@mijn-ui/react-core';
import { useControlledState } from '@mijn-ui/react-hooks';
import {
  CheckboxSlots,
  checkboxStyles,
  CheckboxVariantProps,
  cn,
  UnstyledComponentWithSlots,
} from '@mijn-ui/react-theme';
import {
  CheckIcon,
  DividerHorizontalIcon,
} from '@mijn-ui/shared-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

/* -------------------------------------------------------------------------- */
/*                                  Checkbox                                  */
/* -------------------------------------------------------------------------- */

type CheckboxBaseProps = UnstyledComponentWithSlots<CheckboxSlots> &
  React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>

export type CheckboxProps = CheckboxBaseProps &
  CheckboxVariantProps & {
    checked?: boolean | "indeterminate"
    onCheckedChange?: (checked: boolean | "indeterminate") => void
  }

const Checkbox = ({
  checked: ControlledChecked,
  onCheckedChange: ControlledOnCheckedChange,
  defaultChecked,
  unstyled,
  color,
  size,
  className,
  classNames,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useControlledState<boolean | "indeterminate">(
    ControlledChecked,
    !!defaultChecked,
    ControlledOnCheckedChange,
  )
  const styles = checkboxStyles({ color, size })
  const { base, indicator, icon } = createTVUnstyledSlots(styles, unstyled)

  return (
    <CheckboxPrimitive.Root
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
      checked={checked}
      onCheckedChange={setChecked}
    >
      <CheckboxPrimitive.Indicator
        className={indicator({ className: classNames?.indicator })}
      >
        {checked === "indeterminate" && (
          <DividerHorizontalIcon
            className={icon({ className: classNames?.icon })}
          />
        )}
        {checked === true && (
          <CheckIcon className={icon({ className: classNames?.icon })} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox };
