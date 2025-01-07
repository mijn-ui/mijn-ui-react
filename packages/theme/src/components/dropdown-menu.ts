import { VariantProps } from "tailwind-variants"

import {
  dataDisabledClasses,
  popupAnimationClasses,
  popupSubAnimationClasses,
} from "../utils/classes"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const itemFocusClasses = ["focus:bg-accent focus:text-accent-foreground"]

const commonContentClasses = [
  "z-50 min-w-[8rem] overflow-hidden rounded-medium border-small bg-popover p-1 text-popover-foreground shadow-medium",
]

const commonItemClasses = [
  "relative flex cursor-default select-none items-center rounded-medium py-1.5 pl-8 pr-2 text-small outline-none transition-colors",
]

const commonIconWrapperClasses =
  "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"

const dropdownMenuStyles = tv({
  slots: {
    base: "",
    trigger: buttonStyles().base(),
    subTrigger:
      "focus:bg-accent data-[state=open]:bg-accent flex cursor-default select-none items-center gap-2 rounded-medium px-2 py-1.5 text-small outline-none",
    subTriggerIcon: "pointer-events-none ml-auto size-4 shrink-0",
    subContent: [...popupSubAnimationClasses, ...commonContentClasses],
    content: [
      ...popupAnimationClasses,
      ...commonContentClasses,
      "!duration-300",
    ],
    item: [
      ...itemFocusClasses,
      ...dataDisabledClasses,
      "relative flex cursor-default select-none items-center gap-2 rounded-medium px-2 py-1.5 text-small outline-none transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    ],
    checkboxItem: [
      ...itemFocusClasses,
      ...dataDisabledClasses,
      ...commonItemClasses,
    ],
    checkboxItemIconWrapper: commonIconWrapperClasses,
    checkboxItemIcon: "size-4",
    radioItem: [
      ...itemFocusClasses,
      ...dataDisabledClasses,
      ...commonItemClasses,
    ],
    radioItemIconWrapper: commonIconWrapperClasses,
    radioItemIcon: "size-2 fill-current",
    label: "px-2 py-1.5 text-small font-semibold",
    separator: "bg-muted -mx-1 my-1 h-divider",
    shortcut: "ml-auto text-tiny tracking-widest opacity-60",
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
