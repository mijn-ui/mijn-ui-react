"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { Label } from "@mijn-ui/react-label"
import { VariantProps, tv } from "tailwind-variants"

const labelClasses = [
  "peer-focus:bg-bg-default peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:start-2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
]

const labelWithIconClasses = [
  "rtl:left bg-bg-default -translate-y-4 scale-75 rtl:translate-x-1/4",
]

const inputStyles = tv({
  slots: {
    wrapper: "relative w-full",
    startIcon:
      "[&>svg]:text-fg-tertiary absolute left-2 top-1/2 -translate-y-1/2 transform [&>svg]:size-5",
    endIcon:
      "[&>svg]:text-fg-tertiary absolute right-3.5 top-1/2 -translate-y-1/2 transform [&>svg]:size-5",
    base: [
      "peer",
      "bg-bg-secondary flex h-10 w-full px-3 py-2 text-sm",
      "placeholder:text-fg-tertiary",
      "file:bg-bg-secondary transition duration-300 file:border-0 file:text-sm file:font-medium",
    ],
    label: [
      "text-fg-tertiary bg-bg-secondary absolute start-2 top-2 z-10 max-w-fit origin-[0] -translate-y-4 scale-75 cursor-text px-2 text-sm duration-300",
    ],
  },
  variants: {
    variant: {
      default: {
        base: [
          "rounded-md border",
          "focus-visible:border-outline-brand-subtle",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-outline-brand",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-bg-default ring-outline-brand",
        ],
      },
      underline: {
        base: "border-b-sm focus-visible:border-b-brand border-b outline-none",
      },
      danger: {
        base: [
          "border-outline-danger rounded-md border",
          "focus-visible:border-outline-danger-subtle",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-outline-brand",
          "focus-visible:ring-offset-2",
          "focus-visible:ring-offset-bg-default ring-outline-danger",
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

/* -------------------------------------------------------------------------- */

export type InputBaseProps = UnstyledComponentWithSlots<InputSlots> &
  React.ComponentPropsWithRef<"input"> & {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    label?: React.ReactNode
  }

export type InputProps = InputBaseProps &
  Omit<InputVariantProps, "startIcon" | "endIcon" | "label">

const Input = ({
  variant,
  unstyled,
  className,
  classNames,
  type,
  startIcon,
  endIcon,
  label,
  id: userId,
  disabled,
  ...props
}: InputProps) => {
  const styles = inputStyles({
    variant,
    disabled,
    startIcon: !!startIcon,
    endIcon: !!endIcon,
  })
  const {
    wrapper,
    base,
    startIcon: startIconStyle,
    endIcon: endIconStyle,
    label: labelStyles,
  } = createTVUnstyledSlots(styles, unstyled)
  const id = React.useId()

  return (
    <div
      className={wrapper({
        className: classNames?.wrapper,
      })}
    >
      {startIcon && (
        <div className={startIconStyle({ className: classNames?.startIcon })}>
          {startIcon}
        </div>
      )}
      <input
        type={type}
        className={base({ className: cn(classNames?.base, className) })}
        id={userId || id}
        disabled={disabled}
        data-slot="input"
        // Adding an empty space by default ensures the floating label moves correctly on focus or when input is present.
        placeholder=""
        {...props}
      />

      {label && (
        <Label
          className={labelStyles({ className: classNames?.label })}
          htmlFor={userId || id}
        >
          {label}
        </Label>
      )}

      {endIcon && (
        <div className={endIconStyle({ className: classNames?.endIcon })}>
          {endIcon}
        </div>
      )}
    </div>
  )
}

Input.displayName = "Input"

export { Input }
