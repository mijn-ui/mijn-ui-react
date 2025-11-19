"use client"

import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { VariantProps, tv } from "tailwind-variants"

const separatorStyles = tv({
  slots: {
    base: "bg-outline-default shrink-0",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "h-px w-full",
      },
      vertical: {
        base: "h-full w-px",
      },
    },
  },
})

export type SeparatorVariantProps = VariantProps<typeof separatorStyles>
export type SeparatorSlots = keyof ReturnType<typeof separatorStyles>

export { separatorStyles }

export type SeparatorProps = React.ComponentPropsWithRef<
  typeof SeparatorPrimitive.Root
> & { unstyled?: boolean }

const Separator = ({
  unstyled,
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) => {
  const { base } = createTVUnstyledSlots(
    separatorStyles({ orientation }),
    unstyled,
  )

  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={base({ className })}
      {...props}
    />
  )
}

export { Separator }
