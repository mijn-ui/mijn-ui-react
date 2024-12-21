import { tv, VariantProps } from "tailwind-variants"

const separatorStyles = tv({
  slots: {
    base: "bg-main-border shrink-0",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "h-px w-full",
      },
      vertical: {
        base: "h-full w-px",
      },
    },
  },
})

export type SeparatorVariantProps = VariantProps<typeof separatorStyles>
export type SeparatorSlots = keyof ReturnType<typeof separatorStyles>

export { separatorStyles }
