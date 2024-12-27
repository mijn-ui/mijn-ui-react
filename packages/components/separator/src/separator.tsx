"use client"

import * as React from "react"
import { createTVUnstyledSlots, UnstyledProps } from "@mijn-ui/react-core"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { separatorStyles } from "@mijn-ui/react-theme"

export type SeparatorProps = React.ComponentPropsWithRef<
  typeof SeparatorPrimitive.Root
> &
  UnstyledProps

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
