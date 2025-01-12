import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const commandStyles = tv({
  slots: {
    command:
      "border-border bg-card text-card-foreground flex size-full flex-col overflow-hidden rounded-medium",
    dialogContent: "overflow-hidden p-0 shadow-large",
    dialogCommand:
      "[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5",
    list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
    group:
      "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-tiny [&_[cmdk-group-heading]]:font-medium",
    separator: "bg-border -mx-1 h-divider",
    inputWrapper: "border-border flex items-center border-b px-1",
    inputIcon: "",
    inputPrimitive: "hidden",
    input:
      "border-none bg-transparent focus-visible:border-none focus-visible:ring-0",
    item: "data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground relative flex cursor-default select-none items-center rounded-medium px-2 py-1.5 text-small outline-none data-[disabled]:pointer-events-auto data-[disabled=true]:opacity-disabled",
    empty: "py-6 text-center text-small",
    shortcut: "text-muted-foreground ml-auto text-tiny tracking-widest",
  },
})

export type CommandVariantProps = VariantProps<typeof commandStyles>
export type CommandSlots = keyof ReturnType<typeof commandStyles>

export { commandStyles }
