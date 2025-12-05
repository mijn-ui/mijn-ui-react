"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
  useControlledState,
} from "@mijn-ui/react-core"
import { CheckIcon, DividerHorizontalIcon } from "@mijn-ui/shared-icons"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { VariantProps, tv } from "tailwind-variants"

/* -------------------------------------------------------------------------- */
/*                                  Checkbox                                  */
/* -------------------------------------------------------------------------- */

const checkboxStyles = tv({
  slots: {
    base: [
      "peer size-5 shrink-0 rounded-sm border outline-none",
      "disabled:pointer-events-none disabled:opacity-50",
      "focus-visible:ring-offset-bg-default focus-visible:ring-2 focus-visible:ring-offset-2",
      "data-[state=checked]:border-outline-brand data-[state=indeterminate]:border-outline-brand data-[state=checked]:bg-bg-brand data-[state=indeterminate]:bg-bg-brand data-[state=checked]:text-on-bg-brand data-[state=indeterminate]:text-on-bg-brand",
    ],
    indicator: "flex items-center justify-center text-current",
    icon: "size-4",
  },
})

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>
export type CheckboxSlots = keyof ReturnType<typeof checkboxStyles>
export { checkboxStyles }

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
  className,
  classNames,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useControlledState<boolean | "indeterminate">(
    ControlledChecked,
    !!defaultChecked,
    ControlledOnCheckedChange,
  )
  const styles = checkboxStyles({ color })
  const { base, indicator, icon } = createTVUnstyledSlots(styles, unstyled)

  return (
    <CheckboxPrimitive.Root
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
      checked={checked}
      onCheckedChange={setChecked}
      data-slot="checkbox"
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
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

export { Checkbox }
