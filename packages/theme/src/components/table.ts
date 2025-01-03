import { VariantProps } from "tailwind-variants"

import { tv } from "../utils/tv"

const tableStyles = tv({
  slots: {
    base: "relative text-small",
    header: "h-11",
    body: "divide-border-small [&>tr:hover]:bg-accent divide-y",
    footer: "border-t-border border-t font-medium",
    row: "border-border border-b text-left",
    headerCell: "px-4 py-3 font-semibold",
    cell: "px-4 py-2 align-middle",
    caption: "text-muted-foreground mt-4 text-small",
  },
})

export type TableVariantProps = VariantProps<typeof tableStyles>
export type TableSlots = keyof ReturnType<typeof tableStyles>

export { tableStyles }
