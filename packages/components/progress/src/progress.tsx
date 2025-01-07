"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import {
  ProgressSlots,
  UnstyledComponentWithSlots,
  cn,
  progressStyles,
} from "@mijn-ui/react-theme"
import * as ProgressPrimitive from "@radix-ui/react-progress"

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
