import { VariantProps } from "tailwind-variants"
import { dialogContentAnimationClasses } from "../utils/classes"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const alertDialogStyles = tv({
  slots: {
    base: "",
    trigger: "",
    overlay: [
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
    ],
    contentWrapper: "fixed inset-0 z-50 flex items-center justify-center",
    content: [
      "border-border bg-background-alt flex w-full max-w-lg flex-col gap-2 rounded-xl border p-6 shadow-lg !duration-300",
      ...dialogContentAnimationClasses,
    ],
    header: "flex flex-col gap-2 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
    title: "text-base font-semibold",
    description: "text-secondary-foreground text-sm",
    action: buttonStyles({ variant: "primary" }).base(),
    cancel: buttonStyles({ variant: "ghost" }).base(),
  },
})

export type AlertDialogVariantProps = VariantProps<typeof alertDialogStyles>
export type AlertDialogSlots = keyof ReturnType<typeof alertDialogStyles>
export { alertDialogStyles }
