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
    wrapper: "relative w-full",
    startIcon:
      "[&>svg]:text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2 transform [&>svg]:size-5",
    endIcon:
      "[&>svg]:text-muted-foreground absolute right-3.5 top-1/2 -translate-y-1/2 transform [&>svg]:size-5",
    base: [
      "peer",
      "bg-secondary flex h-10 w-full px-3 py-2 text-sm",
      "placeholder:text-muted-foreground",
      "file:bg-secondary transition duration-300 file:border-0 file:text-sm file:font-medium",
    ],
    label: [
      "text-muted-foreground bg-secondary absolute start-2 top-2 z-10 max-w-fit origin-[0] -translate-y-4 scale-75 cursor-text px-2 text-sm duration-300",
    ],
  },
  variants: {
    variant: {
      default: {
        base: [
          "rounded-md border",
          "focus-visible:border-border-primary-subtle",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-primary",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background ring-primary",
        ],
      },
      underline: {
        base: "border-b-sm focus-visible:border-b-primary border-b outline-none",
      },
      danger: {
        base: [
          "border-danger rounded-md border",
          "focus-visible:border-border-danger-subtle",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-primary",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background ring-danger",
        ],
      },
    },
    disabled: {
      true: {
        wrapper: "pointer-events-none cursor-not-allowed opacity-50",
      },
    },
    startIcon: {
      true: {
        label: labelWithIconClasses,
        base: "pl-8",
      },
    },
    endIcon: {
      true: {
        label: labelWithIconClasses,
        base: "pr-8",
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
  defaultVariants: {
    variant: "default",
  },
})

export type InputVariantProps = VariantProps<typeof inputStyles>
export type InputSlots = keyof ReturnType<typeof inputStyles>

export { inputStyles }
