"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { Dialog, DialogContent, type DialogProps } from "@mijn-ui/react-dialog"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  CommandSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
  cn,
  commandStyles,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import { Command as CommandPrimitive } from "cmdk"

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
  const { command } = createTVUnstyledSlots(
    { command: styles.command },
    unstyled,
  )

  return (
    <CommandProvider value={{ unstyled, styles, classNames }}>
      <CommandPrimitive
        className={command({ className: cn(classNames?.command, className) })}
        {...props}
      />
    </CommandProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                CommandDialog                               */
/* -------------------------------------------------------------------------- */

export type CommandDialogProps = Omit<DialogProps, "classNames"> &
  CommandBaseProps & { className?: string }

const CommandDialog = ({
  children,
  className,
  classNames,
  unstyled,
  ...props
}: CommandDialogProps) => {
  const styles = commandStyles()

  const { commandDialogContent, commandDialog } = createTVUnstyledSlots(
    {
      commandDialogContent: styles.commandDialogContent,
      commandDialog: styles.commandDialog,
    },
    unstyled,
  )

  return (
    <CommandProvider value={{ unstyled, styles, classNames }}>
      <Dialog {...props}>
        <DialogContent
          className={commandDialogContent({
            className: cn(classNames?.commandDialogContent),
          })}
        >
          <Command
            className={commandDialog({
              className: cn(classNames?.commandDialog, className),
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
> &
  UnstyledProps

const CommandInput = ({ className, unstyled, ...props }: CommandInputProps) => {
  const { commandInput, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Input
      className={commandInput({
        className: cn(classNames?.commandInput, className),
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
> &
  UnstyledProps

const CommandList = ({ className, unstyled, ...props }: CommandListProps) => {
  const { commandList, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.List
      className={commandList({
        className: cn(classNames?.commandList, className),
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
> &
  UnstyledProps

const CommandEmpty = ({ unstyled, className, ...props }: CommandEmptyProps) => {
  const { commandEmpty, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Empty
      className={commandEmpty({
        className: cn(classNames?.commandEmpty, className),
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
> &
  UnstyledProps

const CommandGroup = ({ className, unstyled, ...props }: CommandGroupProps) => {
  const { commandGroup, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Group
      className={commandGroup({
        className: cn(classNames?.commandGroup, className),
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
> &
  UnstyledProps

const CommandSeparator = ({
  className,
  unstyled,
  ...props
}: CommandSeparatorProps) => {
  const { commandSeparator, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Separator
      className={commandSeparator({
        className: cn(classNames?.commandSeparator, className),
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
> &
  UnstyledProps

const CommandItem = ({ className, unstyled, ...props }: CommandItemProps) => {
  const { commandItem, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Item
      className={commandItem({
        className: cn(classNames?.commandItem, className),
      })}
      {...props}
    />
  )
}
/* -------------------------------------------------------------------------- */
/*                               CommandShortcut                              */
/* -------------------------------------------------------------------------- */

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement> &
  UnstyledProps

const CommandShortcut = ({
  className,
  unstyled,
  ...props
}: CommandShortcutProps) => {
  const { commandShortcut, classNames } = useCommandStyles(unstyled)

  return (
    <span
      className={commandShortcut({
        className: cn(classNames?.commandShortcut, className),
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
