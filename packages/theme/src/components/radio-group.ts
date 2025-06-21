import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const radioGroupStyles = tv({
  slots: {
    base: "grid gap-2",
    item: "border-border-primary text-primary ring-offset-background focus-visible:ring-primary aspect-square size-4 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    indicator: "flex items-center justify-center",
    icon: "size-2.5 fill-current text-current",
  },
})

export type RadioGroupVariantProps = VariantProps<typeof radioGroupStyles>
export type RadioGroupSlots = keyof ReturnType<typeof radioGroupStyles>

export { radioGroupStyles }
