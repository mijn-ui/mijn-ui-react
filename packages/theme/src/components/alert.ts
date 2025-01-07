import { VariantProps } from "tailwind-variants"
import { colorVariants } from "../utils"
import { tv } from "../utils/tv"

const alertStyles = tv({
  slots: {
    base: "group relative w-full rounded-large px-3 py-4 [&>span~*]:pl-8",
    iconWrapper:
      "translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg]:text-current",
    title: "w-full font-semibold leading-none",
    description: "mt-1 text-small",
  },
  variants: {
    variant: {
      filled: "",
      outlined: { base: "border" },
      subtle: { base: "border" },
    },
    color: {
      default: "",
      success: "",
      info: "",
      warning: "",
      danger: "",
    },
  },
  compoundVariants: [
    {
      variant: "subtle",
      color: "default",
      class: {
        base: ["bg-background/20 text-foreground border-border"],
        title: "text-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "subtle",
      color: "success",
      class: {
        base: [colorVariants.subtle.success, "border-success"],
        title: "text-success-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "subtle",
      color: "info",
      class: {
        base: [colorVariants.subtle.info, "border-info"],
        title: "text-info-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "subtle",
      color: "warning",
      class: {
        base: [colorVariants.subtle.warning, "border-warning"],
        title: "text-warning-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "subtle",
      color: "danger",
      class: {
        base: [colorVariants.subtle.danger, "border-danger"],
        title: "text-danger-foreground",
        description: "text-muted-foreground",
      },
    },

    {
      variant: "filled",
      color: "default",
      class: {
        base: "bg-foreground text-background",
        title: "text-background",
        description: "text-background",
      },
    },
    {
      variant: "filled",
      color: "success",
      class: {
        base: [colorVariants.filled.success, "dark:bg-success/80"],
        title: "text-success-foreground-filled",
        description: "text-success-foreground-filled",
      },
    },
    {
      variant: "filled",
      color: "info",
      class: {
        base: [colorVariants.filled.info, "dark:bg-info/80"],
        title: "text-info-foreground-filled",
        description: "text-info-foreground-filled",
      },
    },
    {
      variant: "filled",
      color: "warning",
      class: {
        base: [colorVariants.filled.warning, "dark:bg-warning/80"],
        title: "text-warning-foreground-filled",
        description: "text-warning-foreground-filled",
      },
    },
    {
      variant: "filled",
      color: "danger",
      class: {
        base: [colorVariants.filled.danger, "dark:bg-danger/80"],
        title: "text-danger-foreground-filled",
        description: "text-danger-foreground-filled",
      },
    },

    {
      variant: "outlined",
      color: "default",
      class: {
        base: "border-foreground text-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "outlined",
      color: "success",
      class: {
        base: [colorVariants.outlined.success],
        title: "text-success-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "outlined",
      color: "info",
      class: {
        base: [colorVariants.outlined.info],
        title: "text-info-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "outlined",
      color: "warning",
      class: {
        base: [colorVariants.outlined.warning],
        title: "text-warning-foreground",
        description: "text-muted-foreground",
      },
    },
    {
      variant: "outlined",
      color: "danger",
      class: {
        base: [colorVariants.outlined.danger],
        title: "text-danger-foreground",
        description: "text-muted-foreground",
      },
    },
  ],
  defaultVariants: {
    variant: "subtle",
    color: "default",
  },
})

export type AlertVariantProps = VariantProps<typeof alertStyles>
export type AlertSlots = keyof ReturnType<typeof alertStyles>
export { alertStyles }
