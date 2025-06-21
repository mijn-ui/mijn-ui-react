import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const labelStyles = tv({
  slots: {
    base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  },
})

export type LabelVariantProps = VariantProps<typeof labelStyles>
export type LabelSlots = keyof ReturnType<typeof labelStyles>
export { labelStyles }
