"use client"

import * as React from "react"
import { cn, createContext } from "@mijn-ui/react-utilities"
import { UnstyledComponentWithSlots, UnstyledProps } from "@mijn-ui/react-core"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "@mijn-ui/shared-icons"
import { dropdownMenuStyles, DropdownMenuSlots } from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"

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

type DropdownTriggerProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Trigger
> &
  UnstyledProps

const DropdownMenuTrigger = ({
  unstyled,
  className,
  ...props
}: DropdownTriggerProps) => {
  const { trigger, classNames } = useDropdownStyles(unstyled)
  return (
    <DropdownMenuPrimitive.Trigger
      className={trigger({
        className: cn(classNames?.trigger, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                           DropdownMenuSubTrigger                           */
/* -------------------------------------------------------------------------- */

type DropdownMenuSubTriggerProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.SubTrigger
> &
  UnstyledProps & {
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
        className: cn(classNames?.subTrigger, className),
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

type DropdownMenuSubContentProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.SubContent
> &
  UnstyledProps

const DropdownMenuSubContent = ({
  unstyled,
  className,
  ...props
}: DropdownMenuSubContentProps) => {
  const { subContent, classNames } = useDropdownStyles(unstyled)

  return (
    <DropdownMenuPrimitive.SubContent
      className={subContent({
        className: cn(classNames?.subContent, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                             DropdownMenuContent                            */
/* -------------------------------------------------------------------------- */

type DropdownMenuContentProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Content
> &
  UnstyledProps

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
          className: cn(classNames?.content, className),
        })}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/*                              DropdownMenuItem                              */
/* -------------------------------------------------------------------------- */

type DropdownMenuItemProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean
} & UnstyledProps

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
        className: cn(classNames?.item, className),
        inset,
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                          DropdownMenuCheckboxItem                          */
/* -------------------------------------------------------------------------- */

type DropdownMenuCheckboxItemProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.CheckboxItem
> &
  UnstyledProps

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
        className: cn(classNames?.checkboxItem, className),
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

type DropdownMenuRadioItemProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.RadioItem
> &
  UnstyledProps

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
        className: cn(classNames?.radioItem, className),
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
} & UnstyledProps

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
        className: cn(classNames?.label, className),
        inset,
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                            DropdownMenuSeparator                           */
/* -------------------------------------------------------------------------- */

type DropdownMenuSeparatorProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.Separator
> &
  UnstyledProps

const DropdownMenuSeparator = ({
  className,
  unstyled,
  ...props
}: DropdownMenuSeparatorProps) => {
  const { separator, classNames } = useDropdownStyles(unstyled)

  return (
    <DropdownMenuPrimitive.Separator
      className={separator({
        className: cn(classNames?.separator, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                            DropdownMenuShortcut                            */
/* -------------------------------------------------------------------------- */

const DropdownMenuShortcut = ({
  className,
  unstyled,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & UnstyledProps) => {
  const { shortcut, classNames } = useDropdownStyles(unstyled)

  return (
    <span
      className={shortcut({
        className: cn(classNames?.shortcut, className),
      })}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
