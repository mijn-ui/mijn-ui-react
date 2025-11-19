"use client"

import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { UnstyledComponentWithSlots } from "@mijn-ui/react-core"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const progressStyles = tv({
  slots: {
    base: "bg-bg-tertiary relative h-2 w-full overflow-hidden rounded-full",
    indicator: "bg-bg-brandsize-full flex-1 transition-all",
  },
})

export type ProgressVariantProps = VariantProps<typeof progressStyles>
export type ProgressSlots = keyof ReturnType<typeof progressStyles>

export { progressStyles }

/* -------------------------------------------------------------------------- */

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
      className={base({ className: cnBase(classNames?.base, className) })}
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
