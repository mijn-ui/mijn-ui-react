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
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <CommandProvider value={{ unstyled, styles, classNames }}>
      <CommandPrimitive
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
  CommandBaseProps & { className?: string }

const CommandDialog = ({
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
> &
  UnstyledProps

const CommandInput = ({ className, unstyled, ...props }: CommandInputProps) => {
  const { input, classNames } = useCommandStyles(unstyled)

  return (
    <CommandPrimitive.Input
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

export type CommandEmptyProps = React.ComponentPropsWithRef<
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

export type CommandGroupProps = React.ComponentPropsWithRef<
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

export type CommandSeparatorProps = React.ComponentPropsWithRef<
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

export type CommandItemProps = React.ComponentPropsWithRef<
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

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement> &
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
  useCommandStyles,
}
