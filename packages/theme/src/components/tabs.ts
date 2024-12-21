import { tv, VariantProps } from "tailwind-variants"
import { disabledClasses } from "../utils/classes"

const tabsStyles = tv({
  slots: {
    base: "",
    list: "bg-main text-muted-text inline-flex h-10 items-center justify-center rounded-lg p-1",
    trigger: [
      ...disabledClasses,
      "focus-visible:ring-ring data-[state=active]:bg-surface data-[state=active]:text-main-text inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 data-[state=active]:shadow-sm",
    ],
    content:
      "focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-1",
  },
})

export type TabsVariantProps = VariantProps<typeof tabsStyles>
export type TabsSlots = keyof ReturnType<typeof tabsStyles>

export { tabsStyles }
