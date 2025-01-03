import { VariantProps } from "tailwind-variants"

import { disabledClasses } from "../utils/classes"
import { tv } from "../utils/tv"

const tabsStyles = tv({
  slots: {
    base: "",
    list: "bg-background text-muted-foreground inline-flex h-10 items-center justify-center rounded-large p-1",
    trigger: [
      ...disabledClasses,
      "focus-visible:ring-ring data-[state=active]:bg-default data-[state=active]:text-default-foreground inline-flex items-center justify-center whitespace-nowrap rounded-medium px-3 py-1.5 text-small font-medium transition-all focus-visible:outline-none focus-visible:ring-1 data-[state=active]:shadow-small",
    ],
    content:
      "focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-1",
  },
})

export type TabsVariantProps = VariantProps<typeof tabsStyles>
export type TabsSlots = keyof ReturnType<typeof tabsStyles>

export { tabsStyles }
