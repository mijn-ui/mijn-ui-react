import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const popoverStyles = tv({
  slots: {
    base: "",
    trigger: "",
    close: buttonStyles({ variant: "ghost" }).base(),
    content: [
      "data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6",
      "border-border-secondary bg-background-alt text-foreground z-50 w-full rounded-md border p-4 shadow-md outline-none !duration-300",
    ],
  },
})

export type PopoverlVariantProps = VariantProps<typeof popoverStyles>
export type PopoverSlots = keyof ReturnType<typeof popoverStyles>

export { popoverStyles }
