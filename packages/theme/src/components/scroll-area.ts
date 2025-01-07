import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const scrollAreaStyles = tv({
  slots: {
    base: "relative overflow-hidden",
    viewport: "size-full rounded-[inherit]",
    scrollbar: "flex touch-none select-none transition-colors",
    scrollThumb: "bg-border relative flex-1 rounded-full",
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: "h-full w-2.5 border-l border-l-transparent p-px",
      },
      horizontal: {
        scrollbar: "h-2.5 flex-col border-t border-t-transparent p-px",
      },
    },
  },
})

export type ScrollAreaVariantProps = VariantProps<typeof scrollAreaStyles>
export type ScrollAreaSlots = keyof ReturnType<typeof scrollAreaStyles>

export { scrollAreaStyles }
