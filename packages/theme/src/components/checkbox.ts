import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const checkboxStyles = tv({
  slots: {
    base: [
      "peer size-5 shrink-0 rounded-sm border outline-none",
      "disabled:pointer-events-none disabled:opacity-50",
      "focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2",
      "data-[state=checked]:border-primary data-[state=indeterminate]:border-primary  data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
    ],
    indicator: "flex items-center justify-center text-current",
    icon: "size-4",
  },
})

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>
export type CheckboxSlots = keyof ReturnType<typeof checkboxStyles>

export { checkboxStyles }
