import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import {
  BadgeVariantsProps,
  UnstyledProps,
  badgeStyles,
} from "@mijn-ui/react-theme"

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  BadgeVariantsProps &
  UnstyledProps

function Badge({
  unstyled,
  className,
  size,
  color,
  variant,
  radius,
  ...props
}: BadgeProps) {
  const styles = badgeStyles({ color, size, variant, radius })
  const { base } = createTVUnstyledSlots(styles, unstyled)

  return <div className={base({ className })} {...props} />
}

export { Badge }
