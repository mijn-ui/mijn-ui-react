import { tv, VariantProps } from "tailwind-variants"

const tableStyles = tv({
  slots: {
    base: "relative text-sm",
    header: "h-11",
    body: "divide-border [&>tr:hover]:bg-accent divide-y",
    footer: "border-t-main-border border-t font-medium",
    row: "border-main-border border-b text-left",
    headerCell: "px-4 py-3 font-semibold",
    cell: "px-4 py-2 align-middle",
    caption: "text-muted-text mt-4 text-sm",
  },
})

export type TableVariantProps = VariantProps<typeof tableStyles>
export type TableSlots = keyof ReturnType<typeof tableStyles>

export { tableStyles }
