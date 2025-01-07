import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const labelClasses = [
  "peer-focus:bg-background peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:start-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
]

const labelWithIconClasses = [
  "rtl:left bg-background -translate-y-4 scale-75 rtl:translate-x-1/4",
]

const inputStyles = tv({
  slots: {
    base: "relative w-full",
    startIcon:
      "[&>svg]:text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2 transform text-medium",
    endIcon:
      "[&>svg]:text-muted-foreground absolute right-3.5 top-1/2 -translate-y-1/2 transform text-medium",
    input: [
      "peer",
      "border-input flex h-10 w-full rounded-medium border-small bg-background px-3 py-2 text-small outline-none",
      "placeholder:text-muted-foreground",
      "file:border-0 file:bg-background file:text-small file:font-medium",
      "focus-visible:border-input-small focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0",
    ],
    label: [
      "text-muted-foreground absolute start-2 top-2 z-10 max-w-fit origin-[0] -translate-y-4 scale-75 cursor-text bg-background px-2 text-small duration-300",
    ],
  },
  variants: {
    disabled: {
      true: {
        base: "opacity-disabled pointer-events-none cursor-not-allowed",
      },
    },
    startIcon: {
      true: {
        label: labelWithIconClasses,
        input: "pl-8",
      },
    },
    endIcon: {
      true: {
        label: labelWithIconClasses,
        input: "pr-8",
      },
    },
  },
  compoundVariants: [
    {
      startIcon: false,
      endIcon: false,
      class: {
        label: labelClasses,
      },
    },
  ],
})

export type InputVariantProps = VariantProps<typeof inputStyles>
export type InputSlots = keyof ReturnType<typeof inputStyles>

export { inputStyles }
