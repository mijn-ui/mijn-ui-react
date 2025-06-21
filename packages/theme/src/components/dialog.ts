import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const dialogStyles = tv({
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
      "border-border-secondary bg-background-alt m-4 flex w-full max-w-[30rem] flex-col gap-4 rounded-md border p-6 shadow-lg !duration-300",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0  data-[state=closed]:zoom-out-90",
    ],
    header: "flex flex-col space-y-2 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    title: "text-base font-semibold leading-none",
    description: "text-secondary-foreground text-sm",
    close: buttonStyles({
      variant: "ghost",
    }).base(),
  },
})
export type DialogVariantProps = VariantProps<typeof dialogStyles>
export type DialogSlots = keyof ReturnType<typeof dialogStyles>
export { dialogStyles }
