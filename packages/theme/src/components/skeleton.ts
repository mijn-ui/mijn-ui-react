import { tv, VariantProps } from "tailwind-variants"

const skeletonStyles = tv({
  slots: {
    base: "bg-muted animate-pulse rounded-md",
  },
})

export type SkeletonVariantProps = VariantProps<typeof skeletonStyles>
export type SkeletonSlots = keyof ReturnType<typeof skeletonStyles>

export { skeletonStyles }
