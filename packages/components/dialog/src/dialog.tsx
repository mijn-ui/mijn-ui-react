"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  createContext,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const dialogStyles = tv({
  slots: {
    base: "",
    trigger: "",
    overlay: [
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
    ],
    contentWrapper: "fixed inset-0 z-50 flex items-center justify-center",
    content: [
      "border-outline-secondary bg-bg-default-alt m-4 flex w-full max-w-120 flex-col gap-4 rounded-md border p-6 shadow-lg",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0  data-[state=closed]:zoom-out-90",
    ],
    header: "flex flex-col space-y-2 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    title: "text-base font-semibold leading-none",
    description: "text-fg-secondary text-sm",
    close: [
      "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "h-9 rounded-md px-3",
      "text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 focus-visible:ring-offset-2",
    ],
  },
})
export type DialogVariantProps = VariantProps<typeof dialogStyles>
export type DialogSlots = keyof ReturnType<typeof dialogStyles>
export { dialogStyles }

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

export type DialogTriggerProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Trigger
> & { unstyled?: boolean }

const DialogTrigger = ({
  unstyled,
  className,
  ...props
}: DialogTriggerProps) => {
  const { trigger, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Trigger
      className={trigger({
        className: cnBase(classNames?.trigger, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 DialogClose                                */
/* -------------------------------------------------------------------------- */

export type DialogCloseProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Close
> & { unstyled?: boolean }

const DialogClose = ({ unstyled, className, ...props }: DialogCloseProps) => {
  const { close, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Close
      className={close({
        className: cnBase(classNames?.close, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogOverlay                               */
/* -------------------------------------------------------------------------- */

export type DialogOverlayProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Overlay
> & { unstyled?: boolean }

const DialogOverlay = ({
  unstyled,
  className,
  ...props
}: DialogOverlayProps) => {
  const { overlay, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Overlay
      className={overlay({
        className: cnBase(classNames?.overlay, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogContent                               */
/* -------------------------------------------------------------------------- */

export type DialogContentProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Content
> & { unstyled?: boolean }

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
            className: cnBase(classNames?.content, className),
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

type DialogHeaderProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const DialogHeader = ({ unstyled, className, ...props }: DialogHeaderProps) => {
  const { header, classNames } = useDialogStyles(unstyled)

  return (
    <div
      className={header({
        className: cnBase(classNames?.header, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                DialogFooter                                */
/* -------------------------------------------------------------------------- */

export type DialogFooterProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const DialogFooter = ({ unstyled, className, ...props }: DialogFooterProps) => {
  const { footer, classNames } = useDialogStyles(unstyled)

  return (
    <div
      className={footer({
        className: cnBase(classNames?.footer, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 DialogTitle                                */
/* -------------------------------------------------------------------------- */

export type DialogTitleProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Title
> & { unstyled?: boolean }

const DialogTitle = ({ unstyled, className, ...props }: DialogTitleProps) => {
  const { title, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Title
      className={title({
        className: cnBase(classNames?.title, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              DialogDescription                             */
/* -------------------------------------------------------------------------- */

export type DialogDescriptionProps = React.ComponentPropsWithRef<
  typeof DialogPrimitive.Description
> & { unstyled?: boolean }

const DialogDescription = ({
  unstyled,
  className,
  ...props
}: DialogDescriptionProps) => {
  const { description, classNames } = useDialogStyles(unstyled)

  return (
    <DialogPrimitive.Description
      className={description({
        className: cnBase(classNames?.description, className),
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
  useDialogStyles,
}
