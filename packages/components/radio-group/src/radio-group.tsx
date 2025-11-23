"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { CircleIcon } from "@mijn-ui/shared-icons"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { VariantProps, tv } from "tailwind-variants"

const radioGroupStyles = tv({
  slots: {
    base: "grid gap-2",
    item: "border-outline-brand text-fg-brand ring-offset-bg-default focus-visible:ring-outline-brand aspect-square size-4 rounded-full border focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    indicator: "flex items-center justify-center",
    icon: "size-2.5 fill-current text-current",
  },
})

export type RadioGroupVariantProps = VariantProps<typeof radioGroupStyles>
export type RadioGroupSlots = keyof ReturnType<typeof radioGroupStyles>

export { radioGroupStyles }

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
> & { unstyled?: boolean }

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
