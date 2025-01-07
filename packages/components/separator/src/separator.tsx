"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { UnstyledProps, separatorStyles } from "@mijn-ui/react-theme"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

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
