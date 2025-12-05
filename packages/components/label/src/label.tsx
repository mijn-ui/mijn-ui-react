"use client"

import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as LabelPrimitive from "@radix-ui/react-label"
import { VariantProps, tv } from "tailwind-variants"

const labelStyles = tv({
  slots: {
    base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  },
})

export type LabelVariantProps = VariantProps<typeof labelStyles>
export type LabelSlots = keyof ReturnType<typeof labelStyles>
export { labelStyles }

export type LabelProps = React.ComponentPropsWithRef<
  typeof LabelPrimitive.Root
> &
  LabelVariantProps & { unstyled?: boolean }

const Label = ({ unstyled, className, ...props }: LabelProps) => {
  const { base } = createTVUnstyledSlots(labelStyles(), unstyled)

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={base({ className })}
      {...props}
    />
  )
}

export { Label }
