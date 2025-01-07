"use client"

import * as React from "react"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  PopoverSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
  cn,
  popoverStyles,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import * as RadixPopover from "@radix-ui/react-popover"

const PopoverArrow = RadixPopover.Arrow

const PopoverAnchor = RadixPopover.Anchor

/* -------------------------------------------------------------------------- */
/*                               PopoverContext                               */
/* -------------------------------------------------------------------------- */

type PopoverBaseProps = UnstyledComponentWithSlots<PopoverSlots>

type PopoverContextType = PopoverBaseProps & {
  styles: ReturnType<typeof popoverStyles>
}

const [PopoverProvider, usePopoverContext] = createContext<PopoverContextType>({
  name: "PopoverContext",
  strict: true,
  errorMessage:
    "usePopoverContext: `context` is undefined. Seems you forgot to wrap component within <Popover />",
})

/* -------------------------------------------------------------------------- */
/*                                 PopoverHook                                */
/* -------------------------------------------------------------------------- */

const usePopoverStyles = (unstyledOverride?: boolean) => {
  const context = usePopoverContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                   Popover                                  */
/* -------------------------------------------------------------------------- */

export type PopoverProps = React.ComponentPropsWithoutRef<
  typeof RadixPopover.Root
> &
  PopoverBaseProps

const Popover = ({ unstyled = false, classNames, ...props }: PopoverProps) => {
  const styles = popoverStyles()

  return (
    <PopoverProvider value={{ unstyled, styles, classNames }}>
      <RadixPopover.Root {...props} />
    </PopoverProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                               PopoverTrigger                               */
/* -------------------------------------------------------------------------- */

type PopoverTriggerProps = React.ComponentPropsWithRef<
  typeof RadixPopover.Trigger
> &
  UnstyledProps

const PopoverTrigger = ({
  unstyled,
  className,
  ...props
}: PopoverTriggerProps) => {
  const { trigger, classNames } = usePopoverStyles(unstyled)

  return (
    <RadixPopover.Trigger
      className={trigger({ className: cn(classNames?.trigger, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                PopoverClose                                */
/* -------------------------------------------------------------------------- */

type PopoverCloseProps = React.ComponentPropsWithRef<
  typeof RadixPopover.Close
> &
  UnstyledProps

const PopoverClose = ({ unstyled, className, ...props }: PopoverCloseProps) => {
  const { close, classNames } = usePopoverStyles(unstyled)

  return (
    <RadixPopover.Close
      className={close({ className: cn(classNames?.close, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                               PopoverContent                               */
/* -------------------------------------------------------------------------- */

type PopoverContentProps = React.ComponentPropsWithRef<
  typeof RadixPopover.Content
> &
  UnstyledProps

const PopoverContent = ({
  unstyled,
  className,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverContentProps) => {
  const { content, classNames } = usePopoverStyles(unstyled)

  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={content({ className: cn(classNames?.content, className) })}
        {...props}
      />
    </RadixPopover.Portal>
  )
}

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
}
