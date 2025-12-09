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
    //   "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform  data-[state=unchecked]:translate-x-0
    thumb:
      "bg-bg-default data-[state=checked]:bg-bg-default-alt pointer-events-none block size-5 rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-[100%] data-[state=unchecked]:translate-x-0",
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
      data-slot="switch"
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <SwitchPrimitives.Thumb
        data-slot="switch-thumb"
        className={thumb({ className: classNames?.thumb })}
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }
