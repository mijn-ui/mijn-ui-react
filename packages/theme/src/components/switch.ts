import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const switchStyles = tv({
  slots: {
    base: [
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted border-medium peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-transparent transition-colors",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-primary",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-background",
    ],
    thumb:
      "bg-background data-[state=checked]:bg-background-alt pointer-events-none block size-5 rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-0.5",
  },
})

export type SwitchVariantProps = VariantProps<typeof switchStyles>
export type SwitchSlots = keyof ReturnType<typeof switchStyles>

export { switchStyles }
