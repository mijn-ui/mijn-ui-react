import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const textareaStyles = tv({
  slots: {
    base: "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-medium border-small bg-background px-3 py-2 text-small focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-disabled",
  },
})

export type TextAreaVariantProps = VariantProps<typeof textareaStyles>
export type TextAreaSlots = keyof ReturnType<typeof textareaStyles>

export { textareaStyles }
