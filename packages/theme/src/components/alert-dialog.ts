import { VariantProps } from "tailwind-variants"

import {
  dialogContentAnimationClasses,
  dialogOverlayClasses,
} from "../utils/classes"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const alertDialogStyles = tv({
  slots: {
    base: "",
    trigger: buttonStyles().base(),
    overlay: dialogOverlayClasses,
    contentWrapper: "fixed inset-0 z-50 flex items-center justify-center",
    content: [
      "border-border bg-popover flex w-full max-w-lg flex-col gap-2 rounded-xl border-small p-6 shadow-large !duration-300",
      ...dialogContentAnimationClasses,
    ],
    header: "flex flex-col space-y-2 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    title: "text-large font-semibold",
    description: "text-muted-foreground text-small",
    action: buttonStyles({ color: "primary" }).base(),
    cancel: buttonStyles({ variant: "ghost" }).base(),
  },
})

export type AlertDialogVariantProps = VariantProps<typeof alertDialogStyles>
export type AlertDialogSlots = keyof ReturnType<typeof alertDialogStyles>
export { alertDialogStyles }
