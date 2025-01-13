import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"
import { commandStyles } from "./command"
import { skeletonStyles } from "./skeleton"

const autocompleteStyles = tv({
  slots: {
    base: "",
    trigger: "",
    content: "w-[--radix-popover-trigger-width] overflow-y-auto p-1",
    contentEmpty: commandStyles().commandEmpty(),
    skeleton: [...skeletonStyles().base(), "h-7 w-full"],
    group: "",
    item: "data-[selected=true]:bg-accent relative flex w-full cursor-default select-none items-center justify-between gap-2 rounded-medium px-2 py-1.5 text-small outline-none data-[disabled]:pointer-events-auto data-[disabled=true]:opacity-disabled",
  },
  variants: {
    selected: {
      true: {
        item: "bg-primary/20 text-primary data-[selected=true]:bg-primary/20 data-[selected=true]:text-primary [&_svg]:size-4",
      },
    },
  },
})

export type AutocompleteVariantProps = VariantProps<typeof autocompleteStyles>
export type AutocompleteSlots = keyof ReturnType<typeof autocompleteStyles>
export { autocompleteStyles }
