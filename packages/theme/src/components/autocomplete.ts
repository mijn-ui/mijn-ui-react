import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const autocompleteStyles = tv({
  slots: {
    base: "",
    trigger: "",
    content: "w-[--radix-popover-trigger-width] overflow-y-auto",
    contentEmpty: "py-6 text-center text-sm",
    skeleton: "bg-muted h-7 w-full animate-pulse",
    group: "",
    item: "data-[selected=true]:bg-secondary relative flex w-full cursor-default select-none items-center justify-between gap-2 px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-auto data-[disabled=true]:opacity-50",
  },
  variants: {
    selected: {
      true: {
        item: "[&_svg]:text-primary [&_svg]:size-4",
      },
    },
  },
})

export type AutocompleteVariantProps = VariantProps<typeof autocompleteStyles>
export type AutocompleteSlots = keyof ReturnType<typeof autocompleteStyles>
export { autocompleteStyles }
