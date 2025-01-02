import { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

const labelStyles = tv({
  slots: {
    base: "text-small font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-disabled",
  },
})

export type LabelVariantProps = VariantProps<typeof labelStyles>
export type LabelSlots = keyof ReturnType<typeof labelStyles>
export { labelStyles }
