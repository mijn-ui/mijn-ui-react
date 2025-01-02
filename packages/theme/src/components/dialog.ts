import { VariantProps } from "tailwind-variants"

import {
  dialogContentAnimationClasses,
  dialogOverlayClasses,
} from "../utils/classes"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const dialogStyles = tv({
  slots: {
    base: "",
    trigger: buttonStyles({ color: "secondary" }).base(),
    overlay: dialogOverlayClasses,
    contentWrapper: "fixed inset-0 z-50 flex items-center justify-center",
    content: [
      "border-border bg-surface m-4 flex w-full max-w-lg flex-col gap-3 rounded-xl border-small p-6 shadow-large !duration-300",
      ...dialogContentAnimationClasses,
    ],
    header: "flex flex-col space-y-1.5 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    title: "text-large font-semibold leading-none tracking-tight",
    description: "text-muted-text text-small",
    close: buttonStyles({ color: "muted", variant: "text" }).base(),
  },
})

export type DialogVariantProps = VariantProps<typeof dialogStyles>
export type DialogSlots = keyof ReturnType<typeof dialogStyles>
export { dialogStyles }
