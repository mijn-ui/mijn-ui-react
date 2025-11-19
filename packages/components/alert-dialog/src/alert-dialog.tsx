"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  createContext,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const alertDialogStyles = tv({
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
      "border-outline-default bg-bg-default-alt flex w-full max-w-lg flex-col gap-2 rounded-xl border p-6 shadow-lg",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0  data-[state=closed]:zoom-out-90",
    ],
    header: "flex flex-col gap-2 text-center sm:text-left",
    footer: "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2",
    title: "text-base font-semibold",
    description: "text-fg-secondary text-sm",
    action: [
      "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3",
      "bg-bg-brand text-on-bg-brand hover:bg-bg-brand/80 focus-visible:ring-outline-brand active:bg-bg-brand/70 shadow-xs",
    ],
    cancel: [
      "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3",
      "text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 focus-visible:ring-offset-2",
    ],
  },
})

export type AlertDialogVariantProps = VariantProps<typeof alertDialogStyles>
export type AlertDialogSlots = keyof ReturnType<typeof alertDialogStyles>
export { alertDialogStyles }

/* -------------------------------------------------------------------------- */

const AlertDialogPortal = AlertDialogPrimitive.Portal

/* -------------------------------------------------------------------------- */
/*                              AlertDialogContext                                  */
/* -------------------------------------------------------------------------- */

type AlertDialogBaseProps = UnstyledComponentWithSlots<AlertDialogSlots>

type AlertDialogContextType = AlertDialogBaseProps & {
  styles: ReturnType<typeof alertDialogStyles>
}

const [AlertDialogProvider, useAlertDialogContext] =
  createContext<AlertDialogContextType>({
    name: "AlertDialogContext",
    strict: true,
    errorMessage:
      "useAlertDialogContext: `context` is undefined. Seems you forgot to wrap component within <AlertDialog />",
  })

/* -------------------------------------------------------------------------- */
/*                                  AlertHook                                 */
/* -------------------------------------------------------------------------- */

const useAlertDialogStyles = (unstyledOverride?: boolean) => {
  const context = useAlertDialogContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                 AlertDialog                                */
/* -------------------------------------------------------------------------- */

export type AlertDialogProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Root
> &
  AlertDialogVariantProps &
  AlertDialogBaseProps

const AlertDialog = ({
  classNames,
  unstyled = false,
  ...props
}: AlertDialogProps) => {
  const styles = alertDialogStyles()

  return (
    <AlertDialogProvider value={{ unstyled, styles, classNames }}>
      <AlertDialogPrimitive.Root {...props} />
    </AlertDialogProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                             AlertDialogTrigger                             */
/* -------------------------------------------------------------------------- */

export type AlertDialogTriggerProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Trigger
> & { unstyled?: boolean }

const AlertDialogTrigger = ({
  unstyled,
  className,
  ...props
}: AlertDialogTriggerProps) => {
  const { trigger, classNames } = useAlertDialogStyles(unstyled)

  return (
    <AlertDialogPrimitive.Trigger
      className={trigger({ className: cnBase(classNames?.trigger, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                             AlertDialogOverlay                             */
/* -------------------------------------------------------------------------- */

export type AlertDialogOverlayProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Overlay
> & { unstyled?: boolean }

const AlertDialogOverlay = ({
  className,
  unstyled,
  ...props
}: AlertDialogOverlayProps) => {
  const { overlay, classNames } = useAlertDialogStyles(unstyled)

  return (
    <AlertDialogPrimitive.Overlay
      className={overlay({ className: cnBase(classNames?.overlay, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                             AlertDialogContent                             */
/* -------------------------------------------------------------------------- */

export type AlertDialogContentProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Content
> & { unstyled?: boolean }

const AlertDialogContent = ({
  unstyled,
  className,
  ...props
}: AlertDialogContentProps) => {
  const { content, classNames } = useAlertDialogStyles(unstyled)
  const { styles } = useAlertDialogContext()

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
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
        <AlertDialogPrimitive.Content
          className={content({
            className: cnBase(classNames?.content, className),
          })}
          {...props}
        />
      </div>
    </AlertDialogPortal>
  )
}

/* -------------------------------------------------------------------------- */
/*                              AlertDialogHeader                             */
/* -------------------------------------------------------------------------- */

export type AlertDialogHeaderProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const AlertDialogHeader = ({
  unstyled,
  className,
  ...props
}: AlertDialogHeaderProps) => {
  const { header, classNames } = useAlertDialogStyles(unstyled)

  return (
    <div
      className={header({ className: cnBase(classNames?.header, className) })}
      {...props}
    />
  )
}
AlertDialogHeader.displayName = "AlertDialogHeader"

/* -------------------------------------------------------------------------- */
/*                              AlertDialogFooter                             */
/* -------------------------------------------------------------------------- */

export type AlertDialogFooterProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const AlertDialogFooter = ({
  className,
  unstyled,
  ...props
}: AlertDialogFooterProps) => {
  const { footer, classNames } = useAlertDialogStyles(unstyled)

  return (
    <div
      className={footer({ className: cnBase(classNames?.footer, className) })}
      {...props}
    />
  )
}
AlertDialogFooter.displayName = "AlertDialogFooter"

/* -------------------------------------------------------------------------- */
/*                              AlertDialogTitle                              */
/* -------------------------------------------------------------------------- */

export type AlertDialogTitleProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Title
> & { unstyled?: boolean }

const AlertDialogTitle = ({
  unstyled,
  className,
  ...props
}: AlertDialogTitleProps) => {
  const { title, classNames } = useAlertDialogStyles(unstyled)

  return (
    <AlertDialogPrimitive.Title
      className={title({ className: cnBase(classNames?.title, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                           AlertDialogDescription                           */
/* -------------------------------------------------------------------------- */

type AlertDialogDescriptionProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Description
> & { unstyled?: boolean }

const AlertDialogDescription = ({
  unstyled,
  className,
  ...props
}: AlertDialogDescriptionProps) => {
  const { description, classNames } = useAlertDialogStyles(unstyled)

  return (
    <AlertDialogPrimitive.Description
      className={description({
        className: cnBase(classNames?.description, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              AlertDialogAction                             */
/* -------------------------------------------------------------------------- */

type AlertDialogActionProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Action
> & { unstyled?: boolean }

const AlertDialogAction = ({
  unstyled,
  className,
  ...props
}: AlertDialogActionProps) => {
  const { action, classNames } = useAlertDialogStyles(unstyled)

  return (
    <AlertDialogPrimitive.Action
      className={action({ className: cnBase(classNames?.action, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              AlertDialogCancel                             */
/* -------------------------------------------------------------------------- */

export type AlertDialogCancelProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Cancel
> & { unstyled?: boolean }

const AlertDialogCancel = ({
  unstyled,
  className,
  ...props
}: AlertDialogCancelProps) => {
  const { cancel, classNames } = useAlertDialogStyles(unstyled)

  return (
    <AlertDialogPrimitive.Cancel
      className={cancel({ className: cnBase(classNames?.cancel, className) })}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  useAlertDialogStyles,
}
