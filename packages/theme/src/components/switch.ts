import { tv, VariantProps } from "tailwind-variants"

const switchStyles = tv({
  slots: {
    base: "focus-visible:ring-ring focus-visible:ring-offset-main data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    thumb:
      "bg-primary-text pointer-events-none block size-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  },
})

export type SwitchVariantProps = VariantProps<typeof switchStyles>
export type SwitchVariantSlots = keyof ReturnType<typeof switchStyles>

export { switchStyles }
