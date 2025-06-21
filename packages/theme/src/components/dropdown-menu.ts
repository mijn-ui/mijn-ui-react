import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const itemFocusClasses = ["focus:bg-secondary"]

const commonContentClasses = [
  "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background-alt text-foreground shadow-lg",
]

const commonItemClasses = [
  "relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
]

const commonIconWrapperClasses =
  "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"

const dropdownMenuStyles = tv({
  slots: {
    base: "",
    trigger: "",
    subTrigger:
      "focus-visible:bg-secondary data-[state=open]:bg-secondary flex cursor-default select-none items-center gap-2 px-2 py-1.5 text-sm outline-none",
    subTriggerIcon: "pointer-events-none ml-auto size-4 shrink-0",
    subContent: [
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      ...commonContentClasses,
    ],
    content: [
      "data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6",
      ...commonContentClasses,
      "!duration-300",
    ],
    item: [
      ...itemFocusClasses,
      "data-[disabled]:pointer-events-none",
      "data-[disabled]:opacity-50",
      "relative flex h-9 cursor-default select-none items-center gap-2 px-2 text-sm outline-none transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    ],
    checkboxItem: [
      ...itemFocusClasses,
      "data-[disabled]:pointer-events-none",
      "data-[disabled]:opacity-50",
      ...commonItemClasses,
    ],
    checkboxItemIconWrapper: commonIconWrapperClasses,
    checkboxItemIcon: "size-4",
    radioItem: [
      ...itemFocusClasses,
      "data-[disabled]:pointer-events-none",
      "data-[disabled]:opacity-50",
      ...commonItemClasses,
    ],
    radioItemIconWrapper: commonIconWrapperClasses,
    radioItemIcon: "size-2 fill-current",
    label: "px-2 py-1.5 text-sm font-semibold",
    separator: "bg-muted h-px -mx-1 my-1",
    shortcut: "ml-auto text-xs tracking-widest opacity-60",
  },
  variants: {
    inset: {
      true: {
        item: "pl-8",
        label: "pl-8",
        subTrigger: "pl-8",
      },
    },
  },
})

export type DropdownMenuVariantProps = VariantProps<typeof dropdownMenuStyles>
export type DropdownMenuSlots = keyof ReturnType<typeof dropdownMenuStyles>

export { dropdownMenuStyles }
