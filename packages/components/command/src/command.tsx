"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@mijn-ui/react-dialog"
import { cn, createContext } from "@mijn-ui/react-utilities"
import {
  createTVUnstyledSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
} from "@mijn-ui/react-core"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "@mijn-ui/shared-icons"
import { commandStyles, CommandSlots } from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"

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

type CommandProps = React.ComponentPropsWithRef<typeof CommandPrimitive> &
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

type CommandDialogProps = DialogProps &
  CommandBaseProps & { className?: string }

const CommandDialog = ({
  children,
  className,
  classNames,
  unstyled,
  ...props
}: CommandDialogProps) => {
  const styles = commandStyles()

  const { dialogContent, dialogCommand } = createTVUnstyledSlots(
    {
      dialogContent: styles.dialogContent,
      dialogCommand: styles.dialogCommand,
    },
    unstyled,
  )

  return (
    <CommandProvider value={{ unstyled, styles, classNames }}>
      <Dialog {...props}>
        <DialogContent
          className={dialogContent({
            className: cn(classNames?.dialogContent),
          })}
        >
          <Command
            className={dialogCommand({
              className: cn(classNames?.dialogCommand, className),
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

type CommandInputProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Input
> &
  UnstyledProps

const CommandInput = ({ className, unstyled, ...props }: CommandInputProps) => {
  const { input, inputIcon, inputWrapper, classNames } =
    useCommandStyles(unstyled)

  return (
    <div
      className={inputWrapper({
        className: classNames?.inputWrapper,
      })}
      /* eslint-disable-next-line */
      cmdk-input-wrapper=""
    >
      <SearchIcon
        className={inputIcon({
          className: classNames?.inputIcon,
        })}
      />
      <CommandPrimitive.Input
        className={input({
          className: cn(classNames?.input, className),
        })}
        {...props}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CommandList                                */
/* -------------------------------------------------------------------------- */

type CommandListProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.List
> &
  UnstyledProps

const CommandList = ({ className, unstyled, ...props }: CommandListProps) => {
  const { list, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.List
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

type CommandEmptyProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Empty
> &
  UnstyledProps

const CommandEmpty = ({ unstyled, className, ...props }: CommandEmptyProps) => {
  const { empty, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Empty
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

type CommandGroupProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Group
> &
  UnstyledProps

const CommandGroup = ({ className, unstyled, ...props }: CommandGroupProps) => {
  const { group, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Group
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

type CommandSeparatorProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Separator
> &
  UnstyledProps

const CommandSeparator = ({
  className,
  unstyled,
  ...props
}: CommandSeparatorProps) => {
  const { separator, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Separator
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

type CommandItemProps = React.ComponentPropsWithRef<
  typeof CommandPrimitive.Item
> &
  UnstyledProps

const CommandItem = ({ className, unstyled, ...props }: CommandItemProps) => {
  const { item, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Item
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

type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement> &
  UnstyledProps

const CommandShortcut = ({
  className,
  unstyled,
  ...props
}: CommandShortcutProps) => {
  const { shortcut, classNames } = useCommandStyles(unstyled)

  return (
    <span
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
}
