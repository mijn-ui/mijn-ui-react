import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const selectStyles = tv({
  slots: {
    base: "",
    trigger: [
      "border-border min-w-44 bg-background-alt placeholder:text-muted-foreground hover:bg-secondary flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm [&>span]:line-clamp-1 gap-4",
      "[&_svg]:size-4 [&_svg]:opacity-50",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-primary",
      "focus-visible:ring-primary",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-background",
    ],
    scrollUpBtn: "",
    scrollDownBtn: "",
    content: [
      "data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6",
      "border-border bg-background-alt text-foreground relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border shadow-sm !duration-300 w-60",
    ],
    viewport: "",
    label: "py-1.5 pl-2 pr-8 text-sm font-semibold",
    item: [
      "data-[disabled]:pointer-events-none group",
      "data-[disabled]:opacity-50",
      "focus:bg-secondary relative flex w-full cursor-default select-none items-center h-9 pl-4 pr-8 text-sm outline-none",
    ],
    itemIndicator:
      "absolute right-4 flex size-3.5 items-center justify-center [&_svg]:size-4 group-data-[state=checked]:text-primary",
    separator: "bg-border -mx-1 my-1 h-px",
  },
  compoundSlots: [
    {
      slots: ["scrollUpBtn", "scrollDownBtn"],
      class:
        "flex cursor-default items-center justify-center py-1 [&_svg]:size-4",
    },
  ],
  variants: {
    position: {
      popper: {
        content:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        viewport:
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
      },
      "item-aligned": {},
    },
  },
})

export type SelectVariantProps = VariantProps<typeof selectStyles>
export type SelectSlots = keyof ReturnType<typeof selectStyles>

export { selectStyles }
