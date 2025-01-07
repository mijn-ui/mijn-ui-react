"use client"

import * as React from "react"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  SelectSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
  cn,
  selectStyles,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@mijn-ui/shared-icons"
import * as SelectPrimitive from "@radix-ui/react-select"

/* -------------------------------------------------------------------------- */
/*                                SelectContext                               */
/* -------------------------------------------------------------------------- */

type SelectBaseProps = UnstyledComponentWithSlots<SelectSlots>

type SelectContextType = SelectBaseProps & {
  styles: ReturnType<typeof selectStyles>
}

const [SelectProvider, useSelectContext] = createContext<SelectContextType>({
  name: "SelectContext",
  strict: true,
  errorMessage:
    "useSelectContext: `context` is undefined. Seems you forgot to wrap component within <Select />",
})

/* -------------------------------------------------------------------------- */
/*                                 SelectHook                                 */
/* -------------------------------------------------------------------------- */

const useSelectStyles = (unstyledOverride?: boolean) => {
  const context = useSelectContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                   Select                                   */
/* -------------------------------------------------------------------------- */

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> &
  SelectBaseProps

const Select = ({ classNames, unstyled = false, ...props }: SelectProps) => {
  const styles = selectStyles()

  return (
    <SelectProvider value={{ unstyled, styles, classNames }}>
      <SelectPrimitive.Root {...props} />
    </SelectProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                SelectTrigger                               */
/* -------------------------------------------------------------------------- */

type SelectTriggerProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Trigger
> &
  UnstyledProps

const SelectTrigger = ({
  unstyled,
  className,
  children,
  ...props
}: SelectTriggerProps) => {
  const { trigger, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Trigger
      className={trigger({
        className: cn(classNames?.trigger, className),
      })}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/* -------------------------------------------------------------------------- */
/*                            SelectScrollUpButton                            */
/* -------------------------------------------------------------------------- */

type SelectScrollUpButtonProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.ScrollUpButton
> &
  UnstyledProps

const SelectScrollUpButton = ({
  unstyled,
  className,
  ...props
}: SelectScrollUpButtonProps) => {
  const { scrollUpBtn, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.ScrollUpButton
      className={scrollUpBtn({
        className: cn(classNames?.scrollUpBtn, className),
      })}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  )
}

/* -------------------------------------------------------------------------- */
/*                           SelectScrollDownButton                           */
/* -------------------------------------------------------------------------- */

type SelectScrollDownButtonProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.ScrollDownButton
> &
  UnstyledProps

const SelectScrollDownButton = ({
  unstyled,
  className,
  ...props
}: SelectScrollDownButtonProps) => {
  const { scrollDownBtn, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.ScrollDownButton
      className={scrollDownBtn({
        className: cn(classNames?.scrollDownBtn, className),
      })}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

/* -------------------------------------------------------------------------- */
/*                                SelectContent                               */
/* -------------------------------------------------------------------------- */

type SelectContentProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Content
> &
  UnstyledProps

const SelectContent = ({
  unstyled,
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) => {
  const { content, viewport, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={content({
          className: cn(classNames?.content, className),
          position,
        })}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={viewport({
            className: classNames?.viewport,
            position,
          })}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 SelectLabel                                */
/* -------------------------------------------------------------------------- */

type SelectLabelProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Label
> &
  UnstyledProps

const SelectLabel = ({ unstyled, className, ...props }: SelectLabelProps) => {
  const { label, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Label
      className={label({
        className: cn(classNames?.label, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 SelectItem                                 */
/* -------------------------------------------------------------------------- */

type SelectItemProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Item
> &
  UnstyledProps

const SelectItem = ({
  unstyled,
  className,
  children,
  ...props
}: SelectItemProps) => {
  const { item, itemIndicator, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Item
      className={item({
        className: cn(classNames?.item, className),
      })}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

      <span
        className={itemIndicator({
          className: classNames?.itemIndicator,
        })}
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

/* -------------------------------------------------------------------------- */
/*                               SelectSeparator                              */
/* -------------------------------------------------------------------------- */

type SelectSeparatorProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Separator
> &
  UnstyledProps

const SelectSeparator = ({
  unstyled,
  className,
  ...props
}: SelectSeparatorProps) => {
  const { separator, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Separator
      className={separator({
        className: cn(classNames?.separator, className),
      })}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
