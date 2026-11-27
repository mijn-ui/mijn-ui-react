"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { VariantProps, tv } from "tailwind-variants"

const progressStyles = tv({
  slots: {
    base: "bg-bg-tertiary relative h-2 w-full overflow-hidden rounded-full",
    indicator: "bg-bg-brand size-full flex-1 transition-all",
  },
})

export type ProgressVariantProps = VariantProps<typeof progressStyles>
export type ProgressSlots = keyof ReturnType<typeof progressStyles>

export { progressStyles }

/* -------------------------------------------------------------------------- */

export type ProgressProps = UnstyledComponentWithSlots<ProgressSlots> &
  React.ComponentPropsWithRef<typeof ProgressPrimitive.Root>

/** Radix's own fallback for a missing or invalid `max`. */
const DEFAULT_MAX = 100

const Progress = ({
  className,
  classNames,
  unstyled,
  value,
  max,
  ref,
  ...props
}: ProgressProps) => {
  const { base, indicator } = createTVUnstyledSlots(progressStyles(), unstyled)

  // Same rule Radix applies to `max`, so the bar and aria-valuemax agree.
  const maxValue =
    typeof max === "number" && max > 0 && !Number.isNaN(max) ? max : DEFAULT_MAX
  // No value means indeterminate: an empty bar. An out-of-range value is
  // clamped for the bar (Radix reports it as indeterminate and logs why).
  const percent =
    typeof value === "number" && !Number.isNaN(value)
      ? Math.min(Math.max(value / maxValue, 0), 1) * 100
      : 0

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      ref={ref}
      // Radix derives aria-valuenow / aria-valuemax / data-state from these.
      value={value}
      max={max}
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={indicator({ className: classNames?.indicator })}
        style={{ transform: `translateX(${percent - 100}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
