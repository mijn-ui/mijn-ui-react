import { tv, VariantProps } from "tailwind-variants"
import {
  dataDisabledClasses,
  disabledClasses,
  popupAnimationClasses,
} from "../utils/classes"

const selectStyles = tv({
  slots: {
    base: "",
    trigger: [
      ...disabledClasses,
      "border-main-border bg-surface placeholder:text-muted-text focus:border-input-border focus:ring-ring hover:bg-accent flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 [&>span]:line-clamp-1",
      "[&_svg]:size-4 [&_svg]:opacity-50",
    ],
    scrollUpBtn: "",
    scrollDownBtn: "",
    content: [
      ...popupAnimationClasses,
      "border-main-border bg-surface text-surface-text relative z-50 max-h-96 min-w-32 overflow-hidden rounded-lg border shadow-md !duration-300",
    ],
    viewport: "p-1",
    label: "py-1.5 pl-2 pr-8 text-sm font-semibold",
    item: [
      ...dataDisabledClasses,
      "data-[state=checked]:text-primary data-[state=checked]:bg-primary/10 focus:bg-accent focus:text-accent-text relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-sm outline-none",
    ],
    itemIndicator:
      "absolute right-2 flex size-3.5 items-center justify-center [&_svg]:size-4",
    separator: "bg-muted -mx-1 my-1 h-px",
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
