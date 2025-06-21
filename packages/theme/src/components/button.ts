import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const buttonStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    icon: "size-5 animate-spin text-current",
  },
  variants: {
    variant: {
      default:
        "bg-background-alt text-foreground hover:bg-secondary focus-visible:ring-primary active:bg-secondary/70 shadow-xs border focus-visible:ring-offset-2",
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/80 focus-visible:ring-primary active:bg-primary/70 shadow-xs",
      danger:
        "bg-danger text-danger-foreground hover:bg-danger/80 focus-visible:ring-danger shadow-xs active:bg-danger/70",
      ghost:
        "text-foreground hover:bg-secondary focus-visible:ring-primary active:bg-secondary/70 focus-visible:ring-offset-2",
    },
    size: {
      sm: "h-8 rounded-md px-3",
      md: "h-9 rounded-md px-3",
      lg: "h-12 rounded-lg px-4",
    },
    iconOnly: {
      true: "gap-0 px-0",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    iconOnly: false,
  },
  compoundVariants: [
    {
      iconOnly: true,
      size: "sm",
      class: {
        base: "size-8",
      },
    },
    {
      iconOnly: true,
      size: "md",
      class: {
        base: "size-9",
      },
    },
    {
      iconOnly: true,
      size: "lg",
      class: {
        base: "size-12",
      },
    },
  ],
})

export type ButtonVariantProps = VariantProps<typeof buttonStyles>
export type ButtonSlots = keyof ReturnType<typeof buttonStyles>
export { buttonStyles }
