import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"

const textareaStyles = tv({
  slots: {
    base: "flex min-h-32 w-full rounded-md border border-outline-default bg-bg-secondary px-3 py-2 text-sm outline-none transition duration-300 placeholder:text-fg-tertiary focus-visible:mijn-focus-ring focus-visible:ring-outline-brand disabled:cursor-not-allowed disabled:opacity-50",
  },
})

export type TextAreaVariantProps = VariantProps<typeof textareaStyles>
export type TextAreaSlots = keyof ReturnType<typeof textareaStyles>

export { textareaStyles }

/* -------------------------------------------------------------------------- */

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { unstyled?: boolean }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ unstyled, className, ...props }, ref) => {
    const { base } = createTVUnstyledSlots(textareaStyles(), unstyled)
    return (
      <textarea
        data-slot="textarea"
        className={base({ className })}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
