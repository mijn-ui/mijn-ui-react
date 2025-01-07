import { VariantProps } from "tailwind-variants"
import { popupAnimationClasses } from "../utils/classes"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const popoverStyles = tv({
  slots: {
    base: "",
    trigger: buttonStyles().base(),
    close: buttonStyles({ variant: "ghost" }).base(),
    content: [
      popupAnimationClasses,
      "border-border bg-popover text-popover-foreground z-50 w-full rounded-large border-small p-4 shadow-medium outline-none !duration-300",
    ],
  },
})

export type PopoverlVariantProps = VariantProps<typeof popoverStyles>
export type PopoverSlots = keyof ReturnType<typeof popoverStyles>

export { popoverStyles }
