"use client"

import * as React from "react"
import {
  createTVUnstyledSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
} from "@mijn-ui/react-core"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "@mijn-ui/shared-icons"
import { radioGroupStyles, RadioGroupSlots } from "@mijn-ui/react-theme"
import { createContext, cn } from "@mijn-ui/react-utilities"
import { useTVUnstyled } from "@mijn-ui/react-hooks"

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

type RadioGroupItemProps = React.ComponentPropsWithRef<
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

export { RadioGroup, RadioGroupItem }
