import { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

const switchStyles = tv({
  slots: {
    base: "focus-visible:ring-ring focus-visible:ring-offset-main data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-medium  border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-disabled",
    thumb:
      "bg-primary-text pointer-events-none block size-5 rounded-full shadow-large ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  },
})

export type SwitchVariantProps = VariantProps<typeof switchStyles>
export type SwitchSlots = keyof ReturnType<typeof switchStyles>

export { switchStyles }
