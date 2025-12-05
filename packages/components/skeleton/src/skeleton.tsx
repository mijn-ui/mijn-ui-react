import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"

const skeletonStyles = tv({
  slots: {
    base: "bg-bg-tertiary animate-pulse rounded-md",
  },
})

export type SkeletonVariantProps = VariantProps<typeof skeletonStyles>
export type SkeletonSlots = keyof ReturnType<typeof skeletonStyles>

export { skeletonStyles }

export type SkeletonProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const Skeleton = ({ unstyled, className, ...props }: SkeletonProps) => {
  const { base } = createTVUnstyledSlots(skeletonStyles(), unstyled)

  return <div data-slot="skeleton" className={base({ className })} {...props} />
}

export { Skeleton }
