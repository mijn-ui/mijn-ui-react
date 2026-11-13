"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { Toaster as SonnerToaster, type ToasterProps } from "sonner"
import { VariantProps, tv } from "tailwind-variants"

/**
 * `toast` is re-exported from `sonner` deliberately.
 *
 * `sonner` is a PEER dependency, not a bundled one, so the app resolves exactly
 * one copy of it. That matters more than it looks: sonner's queue is module
 * state, so a second copy would accept `toast()` calls into a store that the
 * mounted <Toaster /> is not rendering — toasts would simply never appear, with
 * no error anywhere. Importing `toast` from here or straight from `sonner` hits
 * the same instance either way.
 */
export { toast, useSonner } from "sonner"
export type { ToasterProps }

const sonnerStyles = tv({
  slots: {
    toast:
      "group border-outline-secondary bg-bg-default-alt text-fg-default rounded-lg border shadow-lg",
    title: "text-fg-default text-sm font-semibold",
    description: "text-fg-secondary text-sm",
    actionButton:
      "bg-bg-brand text-on-bg-brand rounded-md px-2.5 py-1 text-xs font-medium",
    cancelButton:
      "bg-bg-secondary text-fg-secondary rounded-md px-2.5 py-1 text-xs font-medium",
    closeButton:
      "border-outline-secondary bg-bg-default-alt text-fg-tertiary hover:text-fg-default",
    icon: "shrink-0",
  },
})

export type SonnerVariantProps = VariantProps<typeof sonnerStyles>
export type SonnerSlots = keyof ReturnType<typeof sonnerStyles>

export { sonnerStyles }

/* -------------------------------------------------------------------------- */

/**
 * Sonner reads its surface colours from these CSS variables, so mapping them to
 * the mijn-ui theme tokens is what makes a toast follow light/dark and any
 * re-themed palette without restyling anything per app.
 */
const TOASTER_THEME = {
  "--normal-bg": "var(--color-bg-default-alt)",
  "--normal-text": "var(--color-fg-default)",
  "--normal-border": "var(--color-outline-secondary)",

  "--success-bg": "var(--color-bg-success-subtle)",
  "--success-text": "var(--color-on-bg-success-subtle)",
  "--success-border": "var(--color-outline-success-subtle)",

  "--error-bg": "var(--color-bg-danger-subtle)",
  "--error-text": "var(--color-on-bg-danger-subtle)",
  "--error-border": "var(--color-outline-danger-subtle)",

  "--warning-bg": "var(--color-bg-warning-subtle)",
  "--warning-text": "var(--color-on-bg-warning-subtle)",
  "--warning-border": "var(--color-outline-warning-subtle)",

  "--info-bg": "var(--color-bg-brand-subtle)",
  "--info-text": "var(--color-on-bg-brand-subtle)",
  "--info-border": "var(--color-outline-brand-subtle)",
} as React.CSSProperties

export type MijnToasterProps = UnstyledComponentWithSlots<SonnerSlots> &
  ToasterProps

/**
 * A `sonner` <Toaster /> dressed in the mijn-ui theme.
 *
 * Mount it once, near the root of the app. Every `toast()` call anywhere in the
 * tree renders through this one instance.
 */
const Toaster = ({
  unstyled,
  classNames,
  className,
  style,
  toastOptions,
  ...props
}: MijnToasterProps) => {
  const slots = createTVUnstyledSlots(sonnerStyles(), unstyled)

  return (
    <SonnerToaster
      data-slot="toaster"
      className={cn("toaster group", className)}
      style={{ ...(unstyled ? undefined : TOASTER_THEME), ...style }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: slots.toast({ className: classNames?.toast }),
          title: slots.title({ className: classNames?.title }),
          description: slots.description({
            className: classNames?.description,
          }),
          actionButton: slots.actionButton({
            className: classNames?.actionButton,
          }),
          cancelButton: slots.cancelButton({
            className: classNames?.cancelButton,
          }),
          closeButton: slots.closeButton({
            className: classNames?.closeButton,
          }),
          icon: slots.icon({ className: classNames?.icon }),
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
