import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"

const checkboxStyles = tv({
  slots: {
    base: "rounded-small peer size-5 shrink-0 border-small disabled:cursor-not-allowed disabled:opacity-disabled",
    indicator: "flex items-center justify-center text-current",
    icon: "size-4",
  },
  variants: {
    color: {
      default:
        "border-input data-[state=checked]:border-default data-[state=indeterminate]:border-default data-[state=checked]:bg-default data-[state=checked]:shadow-small data-[state=indeterminate]:bg-default data-[state=indeterminate]:shadow-small data-[state=checked]:text-default-foreground data-[state=indeterminate]:text-default-foreground",
      primary:
        "border-input data-[state=checked]:border-primary data-[state=indeterminate]:border-primary  data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      secondary:
        "border-input data-[state=checked]:border-secondary data-[state=indeterminate]:border-secondary data-[state=checked]:bg-secondary data-[state=indeterminate]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=indeterminate]:text-secondary-foreground",
      success:
        "border-input data-[state=checked]:border-success data-[state=indeterminate]:border-success data-[state=checked]:bg-success data-[state=indeterminate]:bg-success data-[state=checked]:text-success-foreground-filled data-[state=indeterminate]:text-success-foreground-filled",
      info: "border-input data-[state=checked]:border-info data-[state=indeterminate]:border-info data-[state=checked]:bg-info data-[state=indeterminate]:bg-info data-[state=checked]:text-info-foreground-filled data-[state=indeterminate]:text-info-foreground-filled",
      warning:
        "border-input data-[state=checked]:border-warning data-[state=indeterminate]:border-warning data-[state=checked]:bg-warning data-[state=indeterminate]:bg-warning data-[state=checked]:text-warning-foreground-filled data-[state=indeterminate]:text-warning-foreground-filled",
      danger:
        "border-input data-[state=checked]:border-danger data-[state=indeterminate]:border-danger data-[state=checked]:bg-danger data-[state=indeterminate]:bg-danger data-[state=checked]:text-danger-foreground-filled data-[state=indeterminate]:text-danger-foreground-filled",
    },
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
})

export type CheckboxVariantProps = VariantProps<typeof checkboxStyles>
export type CheckboxSlots = keyof ReturnType<typeof checkboxStyles>

export { checkboxStyles }
