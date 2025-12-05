"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as RadixPopover from "@radix-ui/react-popover"
import { VariantProps, tv } from "tailwind-variants"

const popoverStyles = tv({
  slots: {
    base: "",
    trigger: "",
    close: [
      "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 focus-visible:ring-offset-2",
      "h-9 rounded-md px-3",
    ],
    content: [
      "data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6",
      "border-outline-secondary bg-bg-default-alt text-fg-default z-50 w-full rounded-md border p-4 shadow-md outline-none duration-300",
    ],
  },
})

export type PopoverlVariantProps = VariantProps<typeof popoverStyles>
export type PopoverSlots = keyof ReturnType<typeof popoverStyles>

export { popoverStyles }

/* -------------------------------------------------------------------------- */

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
      <RadixPopover.Root data-slot="popover" {...props} />
    </PopoverProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                               PopoverTrigger                               */
/* -------------------------------------------------------------------------- */

export type PopoverTriggerProps = React.ComponentPropsWithRef<
  typeof RadixPopover.Trigger
> & { unstyled?: boolean }

const PopoverTrigger = ({
  unstyled,
  className,
  ...props
}: PopoverTriggerProps) => {
  const { trigger, classNames } = usePopoverStyles(unstyled)

  return (
    <RadixPopover.Trigger
      data-slot="popover-trigger"
      className={trigger({ className: cn(classNames?.trigger, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                PopoverClose                                */
/* -------------------------------------------------------------------------- */

export type PopoverCloseProps = React.ComponentPropsWithRef<
  typeof RadixPopover.Close
> & { unstyled?: boolean }

const PopoverClose = ({ unstyled, className, ...props }: PopoverCloseProps) => {
  const { close, classNames } = usePopoverStyles(unstyled)

  return (
    <RadixPopover.Close
      data-slot="popover-close"
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
> & { unstyled?: boolean }

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
    <RadixPopover.Portal data-slot="popover-portal">
      <RadixPopover.Content
        data-slot="popover-content"
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={content({
          className: cn(classNames?.content, className),
        })}
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
  usePopoverStyles,
}
