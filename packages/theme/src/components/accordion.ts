import { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

const accordionStyles = tv({
  slots: {
    base: "",
    item: "border-b-border border-b",
    triggerWrapper: "flex",
    trigger: "group flex w-full items-center justify-between py-3",
    icon: "text-muted-text duration-400 size-4 shrink-0 ease-in-out group-data-[state=open]:rotate-180",
    contentWrapper:
      "data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open overflow-hidden text-small transition-[height]",
    content: "pb-3 pt-0",
  },
  variants: {
    variant: {
      default: {},
      surface: {
        base: "bg-surface rounded-xl px-4 pb-4 pt-2 shadow-small",
      },
      outlined: {
        base: "border-border rounded-xl border-small px-4 pb-4 pt-2",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type AccordionVariantProps = VariantProps<typeof accordionStyles>
export type AccordionSlots = keyof ReturnType<typeof accordionStyles>
export { accordionStyles }
