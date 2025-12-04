"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { VariantProps, tv } from "tailwind-variants"

const switchStyles = tv({
  slots: {
    base: [
      "data-[state=checked]:bg-bg-brand data-[state=unchecked]:bg-bg-tertiary border-2 peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-transparent transition-colors",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-outline-brand",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-bg-default",
    ],
    thumb:
      "bg-bg-default data-[state=checked]:bg-bg-default-alt pointer-events-none block size-5 rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-0.5",
  },
})

export type SwitchVariantProps = VariantProps<typeof switchStyles>
export type SwitchSlots = keyof ReturnType<typeof switchStyles>

export { switchStyles }

/* -------------------------------------------------------------------------- */

export type SwitchProps = UnstyledComponentWithSlots<SwitchSlots> &
  React.ComponentPropsWithRef<typeof SwitchPrimitives.Root>

const Switch = ({ className, classNames, unstyled, ...props }: SwitchProps) => {
  const { base, thumb } = createTVUnstyledSlots(switchStyles(), unstyled)

  return (
    <SwitchPrimitives.Root
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={thumb({ className: classNames?.thumb })}
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }
