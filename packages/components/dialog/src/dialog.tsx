"use client"

import * as React from "react"
import { cn, createContext } from "@mijn-ui/react-utilities"
import { UnstyledComponentWithSlots, UnstyledProps } from "@mijn-ui/react-core"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  dialogStyles,
  DialogVariantProps,
  DialogSlots,
} from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"

/* -------------------------------------------------------------------------- */
/*                                DialogContext                               */
/* -------------------------------------------------------------------------- */

type DialogBaseProps = UnstyledComponentWithSlots<DialogSlots>

type DialogContextType = DialogBaseProps & {
  styles: ReturnType<typeof dialogStyles>
}

const [DialogProvider, useDialogContext] = createContext<DialogContextType>({
  name: "DialogContext",
  strict: true,
  errorMessage:
    "useDialogContext: `context` is undefined. Seems you forgot to wrap component within <Dialog />",
})

/* -------------------------------------------------------------------------- */
/*                                 DialogHook                                 */
/* -------------------------------------------------------------------------- */
const useDialogStyles = (unstyledOverride?: boolean) => {
  const context = useDialogContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */

const DialogPortal = DialogPrimitive.Portal

export type DialogProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Root
> &
  DialogVariantProps &
  DialogBaseProps

const Dialog = ({ classNames, unstyled = false, ...props }: DialogProps) => {
  const styles = dialogStyles()

  return (
    <DialogProvider value={{ unstyled, styles, classNames }}>
      <DialogPrimitive.Root {...props} />
    </DialogProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogTrigger                               */
/* -------------------------------------------------------------------------- */

type DialogTriggerProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Trigger
> &
  UnstyledProps

const DialogTrigger = ({
  unstyled,
  className,
  ...props
}: DialogTriggerProps) => {
  const { trigger, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Trigger
      className={trigger({
        className: cn(classNames?.trigger, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 DialogClose                                */
/* -------------------------------------------------------------------------- */

type DialogCloseProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Close
> &
  UnstyledProps

const DialogClose = ({ unstyled, className, ...props }: DialogCloseProps) => {
  const { close, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Close
      className={close({
        className: cn(classNames?.close, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogOverlay                               */
/* -------------------------------------------------------------------------- */

type DialogOverlayProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Overlay
> &
  UnstyledProps

const DialogOverlay = ({
  unstyled,
  className,
  ...props
}: DialogOverlayProps) => {
  const { overlay, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Overlay
      className={overlay({
        className: cn(classNames?.overlay, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogContent                               */
/* -------------------------------------------------------------------------- */

type DialogContentProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Content
> &
  UnstyledProps

const DialogContent = ({
  unstyled,
  className,
  children,
  ...props
}: DialogContentProps) => {
  const { content, classNames } = useDialogStyles(unstyled)
  const { styles } = useDialogContext()

  return (
    <DialogPortal>
      <DialogOverlay />
      {/* The outer wrapper (div) is intentionally not unstyled.
          This prevents the dialog from being rendered out of the viewport, which could occur
          if the parent component were to be unstyled. Without this constraint, users might face confusion 
          as the dialog may become invisible or inaccessible. Keeping the wrapper styled ensures proper positioning
          and accessibility regardless of the unstyled prop's usage. */}
      <div
        className={styles.contentWrapper({
          className: classNames?.contentWrapper,
        })}
      >
        <DialogPrimitive.Content
          className={content({
            className: cn(classNames?.content, className),
          })}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogHeader                                */
/* -------------------------------------------------------------------------- */

const DialogHeader = ({
  unstyled,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & UnstyledProps) => {
  const { header, classNames } = useDialogStyles(unstyled)

  return (
    <div
      className={header({
        className: cn(classNames?.header, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogFooter                                */
/* -------------------------------------------------------------------------- */

const DialogFooter = ({
  unstyled,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & UnstyledProps) => {
  const { footer, classNames } = useDialogStyles(unstyled)

  return (
    <div
      className={footer({
        className: cn(classNames?.footer, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 DialogTitle                                */
/* -------------------------------------------------------------------------- */

type DialogTitleProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Title
> &
  UnstyledProps

const DialogTitle = ({ unstyled, className, ...props }: DialogTitleProps) => {
  const { title, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Title
      className={title({
        className: cn(classNames?.title, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              DialogDescription                             */
/* -------------------------------------------------------------------------- */

type DialogDescriptionProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Description
> &
  UnstyledProps

const DialogDescription = ({
  unstyled,
  className,
  ...props
}: DialogDescriptionProps) => {
  const { description, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Description
      className={description({
        className: cn(classNames?.description, className),
      })}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
