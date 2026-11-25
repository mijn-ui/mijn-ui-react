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
  "bg-bg-default -translate-y-4 scale-75 rtl:translate-x-1/4",
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
      "aria-[invalid=true]:border-outline-danger aria-[invalid=true]:ring-outline-danger",
    ],
    label: [
      "text-fg-tertiary bg-bg-secondary absolute start-2 top-2 z-10 max-w-fit origin-[0] -translate-y-4 scale-75 cursor-text px-2 text-sm duration-300",
    ],
  },
  variants: {
    variant: {
      default: {
        base: [
          "rounded-md border border-outline-default",
          "focus-visible:border-outline-brand-subtle",
          "focus-visible:mijn-focus-ring",
          "focus-visible:ring-outline-brand",
          "ring-outline-brand",
        ],
      },
      underline: {
        base: "focus-visible:border-b-outline-brand border-b border-outline-default outline-none",
      },
      danger: {
        base: [
          "border-outline-danger rounded-md border",
          "focus-visible:border-outline-danger-subtle",
          "focus-visible:mijn-focus-ring",
          "focus-visible:ring-outline-brand",
          "ring-outline-danger",
        ],
      },
    },
    size: {
      default: {
        base: "h-10 text-sm px-3",
      },
      lg: {
        base: "h-12 text-base px-4",
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
    // Without the wrapper, the disabled look the wrapper gives (`disabled`
    // variant above) has to live on the input itself.
    bare: {
      true: {
        base: "disabled:cursor-not-allowed disabled:opacity-50",
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
    size: "default",
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
    /**
     * Render the `<input>` alone: no wrapper `<div>`, no generated `id`, no
     * empty `placeholder` — a drop-in for a plain `<input>` in a form that
     * already lays out and labels its own fields. The disabled look moves
     * onto the input.
     *
     * Ignored when `startIcon`, `endIcon` or `label` is set: those are
     * positioned against the wrapper, so they need it.
     *
     * @default false
     */
    bare?: boolean
  }

export type InputProps = InputBaseProps &
  Omit<InputVariantProps, "startIcon" | "endIcon" | "label" | "bare">

const Input = ({
  variant,
  size,
  unstyled,
  className,
  classNames,
  type,
  startIcon,
  endIcon,
  label,
  bare = false,
  id: userId,
  disabled,
  ...props
}: InputProps) => {
  const isBare = bare && !startIcon && !endIcon && !label
  const styles = inputStyles({
    variant,
    size,
    disabled,
    startIcon: !!startIcon,
    endIcon: !!endIcon,
    bare: isBare,
  })
  const {
    wrapper,
    base,
    startIcon: startIconStyle,
    endIcon: endIconStyle,
    label: labelStyles,
  } = createTVUnstyledSlots(styles, unstyled)
  const generatedId = React.useId()
  // Only a label needs to point at the input, so only a label needs an id
  // the caller did not give.
  const id = userId || (label ? generatedId : undefined)

  const input = (
    <input
      type={type}
      className={base({ className: cn(classNames?.base, className) })}
      id={id}
      disabled={disabled}
      data-slot="input"
      // The floating label positions itself with `:placeholder-shown`, which
      // only matches an input that has a placeholder — so give it an empty one.
      placeholder={label ? "" : undefined}
      {...props}
    />
  )

  if (isBare) return input

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
      {input}

      {label && (
        <Label
          className={labelStyles({ className: classNames?.label })}
          htmlFor={id}
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
