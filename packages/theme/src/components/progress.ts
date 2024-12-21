import { tv, VariantProps } from "tailwind-variants"

const progressStyles = tv({
  slots: {
    base: "bg-muted relative h-2 w-full overflow-hidden rounded-full",
    indicator: "bg-primary size-full flex-1 transition-all",
  },
})

export type ProgressVariantProps = VariantProps<typeof progressStyles>
export type ProgressSlots = keyof ReturnType<typeof progressStyles>

export { progressStyles }
