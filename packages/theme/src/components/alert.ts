import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const alertStyles = tv({
  slots: {
    base: "group relative w-full rounded-lg px-3 py-4 [&>span~*]:pl-8",
    iconWrapper:
      "translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg]:text-current",
    title: "w-full font-semibold leading-none",
    description: "mt-1 text-sm",
  },
  variants: {
    variant: {
      danger: {
        base: "border-danger text-danger-emphasis border",
      },
      default: {
        base: "border-border text-foreground border",
        description: "text-secondary-foreground",
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
})

export type AlertVariantProps = VariantProps<typeof alertStyles>
export type AlertSlots = keyof ReturnType<typeof alertStyles>
export { alertStyles }
