import React from "react"

export function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : uncontrolledValue

  const setValue = (newValue: T) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    if (onChange) {
      onChange(newValue)
    }
  }

  return [value, setValue]
}
