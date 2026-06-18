"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"

const toastStyles = tv({
  slots: {
    base: "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border bg-bg-primary p-4 shadow-lg transition-all",
    icon: "mt-0.5 size-5 shrink-0",
    body: "flex flex-1 flex-col gap-1",
    title: "text-sm font-semibold text-fg-primary",
    description: "text-sm text-fg-secondary",
    action: "mt-2",
    close:
      "absolute right-2 top-2 rounded-md p-1 text-fg-tertiary opacity-0 transition-opacity hover:text-fg-primary focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
  },
  variants: {
    intent: {
      default: {
        base: "border-outline-default bg-bg-primary",
        icon: "text-fg-secondary",
      },
      brand: {
        base: "border-outline-brand-subtle bg-bg-primary",
        icon: "text-fg-brand",
      },
      success: {
        base: "border-outline-success-subtle bg-bg-primary",
        icon: "text-fg-success",
      },
      warning: {
        base: "border-outline-warning-subtle bg-bg-primary",
        icon: "text-fg-warning",
      },
      danger: {
        base: "border-outline-danger-subtle bg-bg-primary",
        icon: "text-fg-danger",
      },
    },
  },
  defaultVariants: {
    intent: "default",
  },
})

export type ToastVariantProps = VariantProps<typeof toastStyles>
export type ToastSlots = keyof ReturnType<typeof toastStyles>
export { toastStyles }

/* -------------------------------------------------------------------------- */

export type ToastProps = UnstyledComponentWithSlots<ToastSlots> &
  Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
  ToastVariantProps & {
    title?: React.ReactNode
    description?: React.ReactNode
    icon?: React.ReactNode
    action?: React.ReactNode
    onClose?: () => void
  }

const Toast = ({
  intent,
  unstyled,
  className,
  classNames,
  title,
  description,
  icon,
  action,
  onClose,
  children,
  ...props
}: ToastProps) => {
  const styles = toastStyles({ intent })
  const {
    base,
    icon: iconStyle,
    body,
    title: titleStyle,
    description: descriptionStyle,
    action: actionStyle,
    close,
  } = createTVUnstyledSlots(styles, unstyled)

  return (
    <div
      data-slot="toast"
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      {icon && (
        <span
          data-slot="toast-icon"
          className={iconStyle({ className: classNames?.icon })}
        >
          {icon}
        </span>
      )}
      <div
        data-slot="toast-body"
        className={body({ className: classNames?.body })}
      >
        {title && (
          <p
            data-slot="toast-title"
            className={titleStyle({ className: classNames?.title })}
          >
            {title}
          </p>
        )}
        {description && (
          <p
            data-slot="toast-description"
            className={descriptionStyle({
              className: classNames?.description,
            })}
          >
            {description}
          </p>
        )}
        {action && (
          <div
            data-slot="toast-action"
            className={actionStyle({ className: classNames?.action })}
          >
            {action}
          </div>
        )}
        {children}
      </div>
      {onClose && (
        <button
          data-slot="toast-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={close({ className: classNames?.close })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export { Toast }
