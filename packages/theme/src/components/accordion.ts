import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const accordionStyles = tv({
  slots: {
    base: "",
    item: "border-b-border border-b",
    triggerWrapper: "",
    trigger:
      "group flex w-full items-center justify-between py-4 text-sm font-medium leading-none hover:underline",
    icon: "text-secondary-foreground size-4 shrink-0 duration-300 ease-in-out group-data-[state=open]:rotate-180",
    contentWrapper:
      "data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open text-secondary-foreground overflow-hidden text-sm transition-[height]",
    content: "pb-4 pt-0 text-sm leading-tight",
  },
})

export type AccordionVariantProps = VariantProps<typeof accordionStyles>
export type AccordionSlots = keyof ReturnType<typeof accordionStyles>
export { accordionStyles }
