import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { UnstyledProps, skeletonStyles } from "@mijn-ui/react-theme"

export type SkeletonProps = React.ComponentPropsWithRef<"div"> & UnstyledProps

function Skeleton({ unstyled, className, ...props }: SkeletonProps) {
  const { base } = createTVUnstyledSlots(skeletonStyles(), unstyled)

  return <div className={base({ className })} {...props} />
}

export { Skeleton }
