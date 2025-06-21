import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const tabsStyles = tv({
  slots: {
    base: "",
    list: "flex flex-col items-stretch sm:flex-row sm:items-center",
    trigger: [
      "text-secondary-foreground hover:bg-secondary focus-visible:bg-secondary active:bg-secondary/70 data-[state=active]:border-b-border-primary data-[state=active]:text-primary-emphasis data-[state=active]:hover:text-primary-emphasis inline-flex h-9 items-center justify-center gap-1.5 border-b px-3 text-sm font-normal leading-none outline-none duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:font-medium data-[state=active]:hover:bg-transparent",
    ],
    content:
      "focus-visible:ring-primary mt-2 focus-visible:outline-none focus-visible:ring-1",
  },
})
export type TabsVariantProps = VariantProps<typeof tabsStyles>
export type TabsSlots = keyof ReturnType<typeof tabsStyles>

export { tabsStyles }
