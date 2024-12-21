import { tv, VariantProps } from "tailwind-variants"

const textareaStyles = tv({
  slots: {
    base: "border-input placeholder:text-muted-text focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
  },
})

export type TextAreaVariantProps = VariantProps<typeof textareaStyles>
export type TextAreaSlots = keyof ReturnType<typeof textareaStyles>

export { textareaStyles }
