"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  createContext,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@mijn-ui/shared-icons"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const itemFocusClasses = ["focus:bg-bg-secondary"]

const commonContentClasses = [
  "z-50 min-w-[8rem] overflow-hidden rounded-md border border-outline-default bg-bg-default-alt text-fg-default shadow-lg",
]

const commonItemClasses = [
  "relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
]

const commonIconWrapperClasses =
  "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"

const dropdownMenuStyles = tv({
  slots: {
    base: "",
    trigger: "",
    subTrigger:
      "focus-visible:bg-bg-secondary data-[state=open]:bg-bg-secondary flex cursor-default select-none items-center gap-2 px-2 py-1.5 text-sm outline-none",
    subTriggerIcon: "pointer-events-none ml-auto size-4 shrink-0",
    subContent: [
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      ...commonContentClasses,
    ],
    content: [
      "data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6",
      ...commonContentClasses,
      "!duration-300",
    ],
    item: [
      ...itemFocusClasses,
      "data-[disabled]:pointer-events-none",
      "data-[disabled]:opacity-50",
      "relative flex h-9 cursor-default select-none items-center gap-2 px-2 text-sm outline-none transition-colors [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    ],
    checkboxItem: [
      ...itemFocusClasses,
      "data-[disabled]:pointer-events-none",
      "data-[disabled]:opacity-50",
      ...commonItemClasses,
    ],
    checkboxItemIconWrapper: commonIconWrapperClasses,
    checkboxItemIcon: "size-4",
    radioItem: [
      ...itemFocusClasses,
      "data-[disabled]:pointer-events-none",
      "data-[disabled]:opacity-50",
      ...commonItemClasses,
    ],
    radioItemIconWrapper: commonIconWrapperClasses,
    radioItemIcon: "size-2 fill-current",
    label: "px-2 py-1.5 text-sm font-semibold",
    separator: "bg-bg-tertiary h-px -mx-1 my-1",
    shortcut: "ml-auto text-xs tracking-widest opacity-60",
  },
  variants: {
    inset: {
      true: {
        item: "pl-8",
        label: "pl-8",
        subTrigger: "pl-8",
      },
    },
  },
})

export type DropdownMenuVariantProps = VariantProps<typeof dropdownMenuStyles>
export type DropdownMenuSlots = keyof ReturnType<typeof dropdownMenuStyles>

export { dropdownMenuStyles }

/* -------------------------------------------------------------------------- */

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuContext                            */
/* -------------------------------------------------------------------------- */

type DropdownMenuBaseProps = UnstyledComponentWithSlots<DropdownMenuSlots>

type DropdownContextType = DropdownMenuBaseProps & {
  styles: ReturnType<typeof dropdownMenuStyles>
}

const [DropdownProvider, useDropdownContext] =
  createContext<DropdownContextType>({
    name: "DropdownContext",
    strict: true,
    errorMessage:
      "useDropdownContext: `context` is undefined. Seems you forgot to wrap component within <Dropdown />",
  })

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuHook                              */
/* -------------------------------------------------------------------------- */

const useDropdownStyles = (unstyledOverride?: boolean) => {
  const context = useDropdownContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                DropdownMenu                                */
/* -------------------------------------------------------------------------- */

export type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps &
  DropdownMenuBaseProps

const DropdownMenu = ({
  classNames,
  unstyled = false,
  ...props
}: DropdownMenuProps) => {
  const styles = dropdownMenuStyles()

  return (
    <DropdownProvider value={{ unstyled, styles, classNames }}>
      <DropdownMenuPrimitive.Root {...props} />
    </DropdownProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuTrigger                            */
/* -------------------------------------------------------------------------- */

export type DropdownTriggerProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Trigger
> & { unstyled?: boolean }

const DropdownMenuTrigger = ({
  unstyled,
  className,
  ...props
}: DropdownTriggerProps) => {
  const { trigger, classNames } = useDropdownStyles(unstyled)
  return (
    <DropdownMenuPrimitive.Trigger
      className={trigger({
        className: cnBase(classNames?.trigger, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuSubTrigger                           */
/* -------------------------------------------------------------------------- */

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & { unstyled?: boolean } & {
  inset?: boolean
}

const DropdownMenuSubTrigger = ({
  unstyled,
  className,
  inset,
  children,
  ...props
}: DropdownMenuSubTriggerProps) => {
  const { subTrigger, subTriggerIcon, classNames } = useDropdownStyles(unstyled)

  return (
    <DropdownMenuPrimitive.SubTrigger
      className={subTrigger({
        className: cnBase(classNames?.subTrigger, className),
        inset,
      })}
      {...props}
    >
      {children}
      <ChevronRightIcon
        className={subTriggerIcon({ className: classNames?.subTriggerIcon })}
      />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuSubContent                           */
/* -------------------------------------------------------------------------- */

export type DropdownMenuSubContentProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.SubContent
> & { unstyled?: boolean }

const DropdownMenuSubContent = ({
  unstyled,
  className,
  ...props
}: DropdownMenuSubContentProps) => {
  const { subContent, classNames } = useDropdownStyles(unstyled)

  return (
    <DropdownMenuPrimitive.SubContent
      className={subContent({
        className: cnBase(classNames?.subContent, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuContent                            */
/* -------------------------------------------------------------------------- */

export type DropdownMenuContentProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Content
> & { unstyled?: boolean }

const DropdownMenuContent = ({
  className,
  unstyled,
  sideOffset = 4,
  ...props
}: DropdownMenuContentProps) => {
  const { content, classNames } = useDropdownStyles(unstyled)
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={content({
          className: cnBase(classNames?.content, className),
        })}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuItem                              */
/* -------------------------------------------------------------------------- */

export type DropdownMenuItemProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean
} & { unstyled?: boolean }

const DropdownMenuItem = ({
  unstyled,
  className,
  inset,
  ...props
}: DropdownMenuItemProps) => {
  const { item, classNames } = useDropdownStyles(unstyled)

  return (
    <DropdownMenuPrimitive.Item
      className={item({
        className: cnBase(classNames?.item, className),
        inset,
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                          DropdownMenuCheckboxItem                          */
/* -------------------------------------------------------------------------- */

export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.CheckboxItem
> & { unstyled?: boolean }

const DropdownMenuCheckboxItem = ({
  className,
  unstyled,
  children,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps) => {
  const {
    checkboxItem,
    checkboxItemIconWrapper,
    checkboxItemIcon,
    classNames,
  } = useDropdownStyles(unstyled)
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={checkboxItem({
        className: cnBase(classNames?.checkboxItem, className),
      })}
      checked={checked}
      {...props}
    >
      <span
        className={checkboxItemIconWrapper({
          className: classNames?.checkboxItemIconWrapper,
        })}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon
            className={checkboxItemIcon({
              className: classNames?.checkboxItemIcon,
            })}
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

/* -------------------------------------------------------------------------- */
/*                            DropdownMenuRadioItem                           */
/* -------------------------------------------------------------------------- */

export type DropdownMenuRadioItemProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.RadioItem
> & { unstyled?: boolean }

const DropdownMenuRadioItem = ({
  className,
  unstyled,
  children,
  ...props
}: DropdownMenuRadioItemProps) => {
  const { radioItem, radioItemIconWrapper, radioItemIcon, classNames } =
    useDropdownStyles(unstyled)
  return (
    <DropdownMenuPrimitive.RadioItem
      className={radioItem({
        className: cnBase(classNames?.radioItem, className),
      })}
      {...props}
    >
      <span
        className={radioItemIconWrapper({
          className: classNames?.radioItemIconWrapper,
        })}
      >
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon
            className={radioItemIcon({
              className: classNames?.radioItemIcon,
            })}
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuLabel                             */

type DropdownMenuLabelProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Label
> & {
  inset?: boolean
} & { unstyled?: boolean }

const DropdownMenuLabel = ({
  className,
  unstyled,
  inset,
  ...props
}: DropdownMenuLabelProps) => {
  const { label, classNames } = useDropdownStyles(unstyled)
  return (
    <DropdownMenuPrimitive.Label
      className={label({
        className: cnBase(classNames?.label, className),
        inset,
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                            DropdownMenuSeparator                           */
/* -------------------------------------------------------------------------- */

export type DropdownMenuSeparatorProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Separator
> & { unstyled?: boolean }

const DropdownMenuSeparator = ({
  className,
  unstyled,
  ...props
}: DropdownMenuSeparatorProps) => {
  const { separator, classNames } = useDropdownStyles(unstyled)

  return (
    <DropdownMenuPrimitive.Separator
      className={separator({
        className: cnBase(classNames?.separator, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                            DropdownMenuShortcut                            */
/* -------------------------------------------------------------------------- */

type DropdownMenuShortcutProps = React.ComponentPropsWithRef<"span"> & {
  unstyled?: boolean
}

const DropdownMenuShortcut = ({
  className,
  unstyled,
  ...props
}: DropdownMenuShortcutProps) => {
  const { shortcut, classNames } = useDropdownStyles(unstyled)

  return (
    <span
      className={shortcut({
        className: cnBase(classNames?.shortcut, className),
      })}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  useDropdownStyles,
}
