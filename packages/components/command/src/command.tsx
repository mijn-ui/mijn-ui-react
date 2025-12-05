"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  type DialogProps,
  DialogTitle,
} from "@mijn-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { VariantProps, tv } from "tailwind-variants"

const commandStyles = tv({
  slots: {
    base: "border-outline-default bg-bg-default-alt text-fg-default flex size-full flex-col overflow-hidden rounded-md border",
    dialogWrapper: "overflow-hidden p-0 shadow-lg",
    dialog:
      "[&_[cmdk-group-heading]]:text-fg-tertiary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5",
    list: "max-h-[300px] overflow-y-auto overflow-x-hidden",
    group:
      "text-fg-default [&_[cmdk-group-heading]]:text-fg-tertiary overflow-hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
    separator: "bg-outline-default h-px -mx-1",
    item: "data-[selected='true']:bg-bg-secondary relative flex cursor-default select-none items-center px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-auto data-[disabled=true]:opacity-50",
    input: "",
    empty: "py-6 text-center text-sm",
    shortcut: "text-fg-tertiary ml-auto text-xs tracking-widest",
  },
})

export type CommandVariantProps = VariantProps<typeof commandStyles>
export type CommandSlots = keyof ReturnType<typeof commandStyles>

export { commandStyles }

/* -------------------------------------------------------------------------- */
/*                               CommandContext                               */
/* -------------------------------------------------------------------------- */

type CommandBaseProps = UnstyledComponentWithSlots<CommandSlots>

type CommandContextType = CommandBaseProps & {
  styles: ReturnType<typeof commandStyles>
}

const [CommandProvider, useCommandContext] = createContext<CommandContextType>({
  name: "CommandContext",
  strict: true,
  errorMessage:
    "useCommandContext: `context` is undefined. Seems you forgot to wrap component within <Command />",
})

/* -------------------------------------------------------------------------- */
/*                                 CommandHook                                */
/* -------------------------------------------------------------------------- */

const useCommandStyles = (unstyledOverride?: boolean) => {
  const context = useCommandContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                   Command                                  */
/* -------------------------------------------------------------------------- */

export type CommandProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive
> &
  CommandBaseProps

const Command = ({
  className,
  classNames,
  unstyled = false,
  ...props
}: CommandProps) => {
  const styles = commandStyles()
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <CommandProvider value={{ unstyled, styles, classNames }}>
      <CommandPrimitive
        data-slot="command"
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </CommandProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                CommandDialog                               */
/* -------------------------------------------------------------------------- */

export type CommandDialogProps = Omit<DialogProps, "classNames"> &
  CommandBaseProps & {
    className?: string
    title?: string
    description?: string
  }

const CommandDialog = ({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  classNames,
  unstyled,
  ...props
}: CommandDialogProps) => {
  const styles = commandStyles()

  const { dialogWrapper, dialog } = createTVUnstyledSlots(
    {
      dialogWrapper: styles.dialogWrapper,
      dialog: styles.dialog,
    },
    unstyled,
  )

  return (
    <CommandProvider value={{ unstyled, styles, classNames }}>
      <Dialog {...props}>
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogContent
          className={dialogWrapper({
            className: cn(classNames?.dialogWrapper),
          })}
        >
          <Command
            className={dialog({
              className: cn(classNames?.dialog, className),
            })}
          >
            {children}
          </Command>
        </DialogContent>
      </Dialog>
    </CommandProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                CommandInput                                */
/* -------------------------------------------------------------------------- */

export type CommandInputProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Input
> & { unstyled?: boolean }

const CommandInput = ({ className, unstyled, ...props }: CommandInputProps) => {
  const { input, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Input
      data-slot="command-input"
      className={input({
        className: cn(classNames?.input, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CommandList                                */
/* -------------------------------------------------------------------------- */

export type CommandListProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.List
> & { unstyled?: boolean }

const CommandList = ({ className, unstyled, ...props }: CommandListProps) => {
  const { list, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={list({
        className: cn(classNames?.list, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                CommandEmpty                                */
/* -------------------------------------------------------------------------- */

export type CommandEmptyProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Empty
> & { unstyled?: boolean }

const CommandEmpty = ({ unstyled, className, ...props }: CommandEmptyProps) => {
  const { empty, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={empty({
        className: cn(classNames?.empty, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                CommandGroup                                */
/* -------------------------------------------------------------------------- */

export type CommandGroupProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Group
> & { unstyled?: boolean }

const CommandGroup = ({ className, unstyled, ...props }: CommandGroupProps) => {
  const { group, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={group({
        className: cn(classNames?.group, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              CommandSeparator                              */
/* -------------------------------------------------------------------------- */

export type CommandSeparatorProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Separator
> & { unstyled?: boolean }

const CommandSeparator = ({
  className,
  unstyled,
  ...props
}: CommandSeparatorProps) => {
  const { separator, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={separator({
        className: cn(classNames?.separator, className),
      })}
      {...props}
    />
  )
}
/* -------------------------------------------------------------------------- */
/*                                 CommandItem                                */
/* -------------------------------------------------------------------------- */

export type CommandItemProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Item
> & { unstyled?: boolean }

const CommandItem = ({ className, unstyled, ...props }: CommandItemProps) => {
  const { item, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={item({
        className: cn(classNames?.item, className),
      })}
      {...props}
    />
  )
}
/* -------------------------------------------------------------------------- */
/*                               CommandShortcut                              */
/* -------------------------------------------------------------------------- */

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement> & {
  unstyled?: boolean
}

const CommandShortcut = ({
  className,
  unstyled,
  ...props
}: CommandShortcutProps) => {
  const { shortcut, classNames } = useCommandStyles(unstyled)

  return (
    <span
      data-slot="command-shortcut"
      className={shortcut({
        className: cn(classNames?.shortcut, className),
      })}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  useCommandStyles,
}
