import { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

const radioGroupStyles = tv({
  slots: {
    base: "grid gap-2",
    item: "border-primary text-primary ring-offset-main focus-visible:ring-ring aspect-square size-4 rounded-full border-small focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-disabled",
    indicator: "flex items-center justify-center",
    icon: "size-2.5 fill-current text-current",
  },
})

export type RadioGroupVariantProps = VariantProps<typeof radioGroupStyles>
export type RadioGroupSlots = keyof ReturnType<typeof radioGroupStyles>

export { radioGroupStyles }
