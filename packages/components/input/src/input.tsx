"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { Label } from "@mijn-ui/react-label"
import {
  InputSlots,
  UnstyledComponentWithSlots,
  cn,
  inputStyles,
} from "@mijn-ui/react-theme"

export type InputProps = UnstyledComponentWithSlots<InputSlots> &
  React.ComponentPropsWithRef<"input"> & {
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    label?: React.ReactNode
  }

const Input = ({
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
    disabled,
    startIcon: !!startIcon,
    endIcon: !!endIcon,
  })
  const {
    inputWrapper,
    input,
    startIcon: startIconStyle,
    endIcon: endIconStyle,
    label: labelStyles,
  } = createTVUnstyledSlots(styles, unstyled)
  const id = React.useId()

  return (
    <div
      className={inputWrapper({
        className: cn(classNames?.inputWrapper, className),
      })}
    >
      {startIcon && (
        <div className={startIconStyle({ className: classNames?.startIcon })}>
          {startIcon}
        </div>
      )}
      <input
        type={type}
        className={input({ className: classNames?.input })}
        id={userId || id}
        disabled={disabled}
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
