"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import {
  SwitchSlots,
  UnstyledComponentWithSlots,
  cn,
  switchStyles,
} from "@mijn-ui/react-theme"
import * as SwitchPrimitives from "@radix-ui/react-switch"

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
