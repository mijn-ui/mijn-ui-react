"use client"

import * as React from "react"
import {
  createTVUnstyledSlots,
  UnstyledComponentWithSlots,
} from "@mijn-ui/react-core"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { ProgressSlots, progressStyles } from "@mijn-ui/react-theme"
import { cn } from "@mijn-ui/react-utilities"

export type ProgressProps = UnstyledComponentWithSlots<ProgressSlots> &
  React.ComponentPropsWithRef<typeof ProgressPrimitive.Root>

const Progress = ({
  className,
  classNames,
  unstyled,
  value,
  ref,
  ...props
}: ProgressProps) => {
  const { base, indicator } = createTVUnstyledSlots(progressStyles(), unstyled)

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={indicator({ className: classNames?.indicator })}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
