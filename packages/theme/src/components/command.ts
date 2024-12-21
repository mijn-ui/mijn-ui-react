import { tv, VariantProps } from "tailwind-variants"

const commandStyles = tv({
  slots: {
    command:
      "border-main-border bg-surface text-surface-text flex size-full flex-col overflow-hidden rounded-md",
    dialogContent: "overflow-hidden p-0 shadow-lg",
    dialogCommand:
      "[&_[cmdk-group-heading]]:text-muted-text [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5",
    list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
    group:
      "text-main-text [&_[cmdk-group-heading]]:text-muted-text overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
    separator: "bg-main-border -mx-1 h-px",
    inputWrapper: "border-main-border flex items-center border-b px-3",
    inputIcon: "mr-2 size-4 shrink-0 opacity-50",
    input:
      "placeholder:text-muted-text flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50",
    item: "data-[selected='true']:bg-accent data-[selected=true]:text-accent-text relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-auto data-[disabled=true]:opacity-50",
    empty: "py-6 text-center text-sm",
    shortcut: "text-muted-text ml-auto text-xs tracking-widest",
  },
})

export type CommandVariantProps = VariantProps<typeof commandStyles>
export type CommandSlots = keyof ReturnType<typeof commandStyles>

export { commandStyles }
