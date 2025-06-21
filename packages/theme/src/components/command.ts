import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const commandStyles = tv({
  slots: {
    base: "border-border bg-background-alt text-foreground flex size-full flex-col overflow-hidden rounded-md border",
    dialogWrapper: "overflow-hidden p-0 shadow-lg",
    dialog:
      "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5",
    list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
    group:
      "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
    separator: "bg-border h-px -mx-1",
    item: "data-[selected='true']:bg-secondary relative flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-auto data-[disabled=true]:opacity-50",
    input: "",
    empty: "py-6 text-center text-sm",
    shortcut: "text-muted-foreground ml-auto text-xs tracking-widest",
  },
})

export type CommandVariantProps = VariantProps<typeof commandStyles>
export type CommandSlots = keyof ReturnType<typeof commandStyles>

export { commandStyles }
