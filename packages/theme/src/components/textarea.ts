import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const textareaStyles = tv({
  slots: {
    base: "focus-visible:ring-offset-background flex min-h-32 w-full rounded-md border bg-secondary px-3 py-2 text-sm outline-none transition duration-300 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
})

export type TextAreaVariantProps = VariantProps<typeof textareaStyles>
export type TextAreaSlots = keyof ReturnType<typeof textareaStyles>

export { textareaStyles }
