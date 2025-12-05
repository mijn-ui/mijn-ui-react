"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@mijn-ui/shared-icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import { VariantProps, tv } from "tailwind-variants"

const selectStyles = tv({
  slots: {
    base: "",
    trigger: [
      "border-outline-default min-w-44 bg-bg-default-alt placeholder:text-fg-tertiary hover:bg-bg-secondary flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm [&>span]:line-clamp-1 gap-4",
      "[&_svg]:size-4 [&_svg]:opacity-50",
      "disabled:pointer-events-none",
      "disabled:opacity-50",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-outline-brand",
      "focus-visible:ring-outline-brand",
      "focus-visible:ring-offset-2",
      "focus-visible:ring-offset-bg-default",
    ],
    scrollUpBtn: "",
    scrollDownBtn: "",
    content: [
      "data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6 duration-300",
      "border-outline-default bg-bg-default-alt text-fg-default relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border shadow-sm w-60",
    ],
    viewport: "",
    label: "py-1.5 pl-2 pr-8 text-sm font-semibold",
    item: [
      "data-disabled:pointer-events-none group",
      "data-disabled:opacity-50",
      "focus:bg-bg-secondary relative flex w-full cursor-default select-none items-center h-9 pl-4 pr-8 text-sm outline-none",
    ],
    itemIndicator:
      "absolute right-4 flex size-3.5 items-center justify-center [&_svg]:size-4 group-data-[state=checked]:text-fg-brand",
    separator: "bg-outline-default -mx-1 my-1 h-px",
  },
  compoundSlots: [
    {
      slots: ["scrollUpBtn", "scrollDownBtn"],
      class:
        "flex cursor-default items-center justify-center py-1 [&_svg]:size-4",
    },
  ],
  variants: {
    position: {
      popper: {
        content:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        viewport:
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
      },
      "item-aligned": {},
    },
  },
})

export type SelectVariantProps = VariantProps<typeof selectStyles>
export type SelectSlots = keyof ReturnType<typeof selectStyles>

export { selectStyles }

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
      <SelectPrimitive.Root data-slot="select" {...props} />
    </SelectProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                SelectTrigger                               */
/* -------------------------------------------------------------------------- */
export type SelectTriggerProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Trigger
> & { unstyled?: boolean; hideIcon?: boolean; icon?: React.ReactNode }

const SelectTrigger = ({
  hideIcon,
  icon,
  unstyled,
  className,
  children,
  ...props
}: SelectTriggerProps) => {
  const { trigger, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={trigger({
        className: cn(classNames?.trigger, className),
      })}
      {...props}
    >
      {children}

      {!hideIcon && <SelectTriggerIcon>{icon}</SelectTriggerIcon>}
    </SelectPrimitive.Trigger>
  )
}

/* -------------------------------------------------------------------------- */
/*                              SelectTriggerIcon                             */
/* -------------------------------------------------------------------------- */

const SelectTriggerIcon = ({
  children,
  asChild = true,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Icon> & {
  children?: React.ReactNode
}) => {
  return (
    <SelectPrimitive.Icon
      data-slot="select-trigger-icon"
      asChild={asChild}
      {...props}
    >
      {children ? children : <ChevronDownIcon />}
    </SelectPrimitive.Icon>
  )
}

/* -------------------------------------------------------------------------- */
/*                            SelectScrollUpButton                            */
/* -------------------------------------------------------------------------- */

export type SelectScrollUpButtonProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.ScrollUpButton
> & { unstyled?: boolean }

const SelectScrollUpButton = ({
  unstyled,
  className,
  ...props
}: SelectScrollUpButtonProps) => {
  const { scrollUpBtn, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
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

export type SelectScrollDownButtonProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.ScrollDownButton
> & { unstyled?: boolean }

const SelectScrollDownButton = ({
  unstyled,
  className,
  ...props
}: SelectScrollDownButtonProps) => {
  const { scrollDownBtn, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
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

export type SelectContentProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Content
> & { unstyled?: boolean }

const SelectContent = ({
  unstyled,
  className,
  children,
  position = "popper",
  ...props
}: SelectContentProps) => {
  const { content, viewport, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Portal data-slot="select-portal">
      <SelectPrimitive.Content
        data-slot="select-content"
        className={content({
          className: cn(classNames?.content, className),
          position,
        })}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-slot="select-viewport"
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

export type SelectLabelProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Label
> & { unstyled?: boolean }

const SelectLabel = ({ unstyled, className, ...props }: SelectLabelProps) => {
  const { label, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
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

export type SelectItemProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Item
> & { unstyled?: boolean }

const SelectItem = ({
  unstyled,
  className,
  children,
  ...props
}: SelectItemProps) => {
  const { item, itemIndicator, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={item({
        className: cn(classNames?.item, className),
      })}
      {...props}
    >
      <SelectPrimitive.ItemText data-slot="select-item-text">
        {children}
      </SelectPrimitive.ItemText>

      <span
        className={itemIndicator({
          className: classNames?.itemIndicator,
        })}
      >
        <SelectPrimitive.ItemIndicator data-slot="select-item-indicator">
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

/* -------------------------------------------------------------------------- */
/*                               SelectSeparator                              */
/* -------------------------------------------------------------------------- */

export type SelectSeparatorProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.Separator
> & { unstyled?: boolean }

const SelectSeparator = ({
  unstyled,
  className,
  ...props
}: SelectSeparatorProps) => {
  const { separator, classNames } = useSelectStyles(unstyled)

  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
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
  SelectTriggerIcon,
  SelectValue,
  useSelectStyles,
}
