import { VariantProps } from "tailwind-variants"
import { disabledClasses } from "../utils"
import { focusVisibleClasses } from "../utils/classes"
import { tv } from "../utils/tv"

const switchStyles = tv({
  slots: {
    base: [
      "data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-medium  border-transparent transition-colors",
      ...disabledClasses,
      ...focusVisibleClasses,
    ],
    thumb:
      "bg-primary-foreground pointer-events-none block size-5 rounded-full shadow-large ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  },
})

export type SwitchVariantProps = VariantProps<typeof switchStyles>
export type SwitchSlots = keyof ReturnType<typeof switchStyles>

export { switchStyles }
