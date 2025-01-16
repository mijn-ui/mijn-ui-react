"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  RadioGroupSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
  cn,
  radioGroupStyles,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import { CircleIcon } from "@mijn-ui/shared-icons"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

/* -------------------------------------------------------------------------- */
/*                              RadioGroupContext                             */
/* -------------------------------------------------------------------------- */

type RadioGroupBaseProps = UnstyledComponentWithSlots<RadioGroupSlots>

type RadioGroupContextType = RadioGroupBaseProps & {
  styles: ReturnType<typeof radioGroupStyles>
}

const [RadioGroupProvider, useRadioGroupContext] =
  createContext<RadioGroupContextType>({
    name: "RadioGroupContext",
    strict: true,
    errorMessage:
      "useRadioGroupContext: `context` is undefined. Seems you forgot to wrap component within <RadioGroup />",
  })

/* -------------------------------------------------------------------------- */
/*                               RadioGroupHook                               */
/* -------------------------------------------------------------------------- */

const useRadioGroupStyles = (unstyledOverride?: boolean) => {
  const context = useRadioGroupContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                 RadioGroup                                 */
/* -------------------------------------------------------------------------- */

export type RadioGroupProps = React.ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Root
> &
  RadioGroupBaseProps

const RadioGroup = ({
  unstyled,
  className,
  classNames,
  ...props
}: RadioGroupProps) => {
  const styles = radioGroupStyles()
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <RadioGroupProvider value={{ unstyled, styles, classNames }}>
      <RadioGroupPrimitive.Root
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </RadioGroupProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                               RadioGroupItem                               */
/* -------------------------------------------------------------------------- */

export type RadioGroupItemProps = React.ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Item
> &
  UnstyledProps

const RadioGroupItem = ({
  unstyled,
  className,
  ...props
}: RadioGroupItemProps) => {
  const { item, indicator, icon, classNames } = useRadioGroupStyles(unstyled)

  return (
    <RadioGroupPrimitive.Item
      className={item({ className: cn(classNames?.item, className) })}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={indicator({ className: classNames?.indicator })}
      >
        <CircleIcon className={icon({ className: classNames?.icon })} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, useRadioGroupStyles }
