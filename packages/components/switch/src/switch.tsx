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
      // Not `pointer-events-none`: a disabled switch still has to receive the
      // hover that shows its `title` (why it is disabled).
      "disabled:cursor-not-allowed",
      "disabled:opacity-50",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-outline-brand",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-bg-default",
    ],
    // In dark mode `bg-default` is near-black, the same darkness as the
    // unchecked track, and the shadow that sets the thumb off in light mode
    // vanishes. No single token is light in both modes, so the unchecked
    // thumb switches to `fg-default` under `.dark` — the class theme.css
    // itself switches its tokens on.
    thumb:
      "bg-bg-default data-[state=checked]:bg-bg-default-alt in-[.dark]:data-[state=unchecked]:bg-fg-default pointer-events-none block size-5 rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-[100%] data-[state=unchecked]:translate-x-0",
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
