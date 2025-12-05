"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"

const alertStyles = tv({
  slots: {
    base: "group space-y-1 relative w-full rounded-lg px-3 py-4 [&>span~*]:pl-8 border",
    iconWrapper:
      "translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&_svg]:text-current",
    title: "w-full font-semibold text-sm leading-none",
    description: "text-sm",
  },
  variants: {
    variant: {
      default: "border-outline-default bg-bg-default text-fg-default",
      brand:
        "border-outline-brand-subtle bg-bg-brand-subtle text-on-bg-brand-subtle",
      secondary: "border-outline-secondary bg-bg-secondary text-fg-secondary",
      success:
        "border-outline-success-subtle bg-bg-success-subtle text-on-bg-success-subtle",
      warning:
        "border-outline-warning-subtle bg-bg-warning-subtle text-on-bg-warning-subtle",
      danger:
        "border-outline-danger-subtle bg-bg-danger-subtle text-on-bg-danger-subtle",
      inverse: "border-outline-default bg-bg-inverse text-fg-inverse",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type AlertVariantProps = VariantProps<typeof alertStyles>
export type AlertSlots = keyof ReturnType<typeof alertStyles>
export { alertStyles }

/* -------------------------------------------------------------------------- */
/*                              AlertContext                                  */
/* -------------------------------------------------------------------------- */

type AlertBaseProps = UnstyledComponentWithSlots<AlertSlots>

type AlertContextType = AlertBaseProps & {
  styles: ReturnType<typeof alertStyles>
}

const [AlertProvider, useAlertContext] = createContext<AlertContextType>({
  name: "AlertContext",
  strict: true,
  errorMessage:
    "useAlertContext: `context` is undefined. Seems you forgot to wrap component within <Alert />",
})

/* -------------------------------------------------------------------------- */
/*                                  AlertHook                                 */
/* -------------------------------------------------------------------------- */

const useAlertStyles = (unstyledOverride?: boolean) => {
  const context = useAlertContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                    Alert                                   */
/* -------------------------------------------------------------------------- */

export type AlertProps = React.ComponentProps<"div"> &
  AlertVariantProps &
  AlertBaseProps

const Alert = ({
  variant,
  unstyled = false,
  className,
  classNames,
  ...props
}: AlertProps) => {
  const styles = alertStyles({ variant })
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <AlertProvider value={{ styles, unstyled, classNames }}>
      <div
        data-slot="alert"
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </AlertProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  AlertIcon                                 */
/* -------------------------------------------------------------------------- */

export type AlertIconProps = React.ComponentProps<"span"> & {
  unstyled?: boolean
}

const AlertIcon = ({ unstyled, className, ...props }: AlertIconProps) => {
  const { iconWrapper, classNames } = useAlertStyles(unstyled)

  return (
    <span
      data-slot="alert-icon"
      className={iconWrapper({
        className: cn(classNames?.iconWrapper, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 AlertTitle                                 */
/* -------------------------------------------------------------------------- */

export type AlertTitleProps = React.ComponentProps<"h5"> & {
  unstyled?: boolean
}

const AlertTitle = ({ unstyled, className, ...props }: AlertTitleProps) => {
  const { title, classNames } = useAlertStyles(unstyled)

  return (
    <h5
      data-slot="alert-title"
      className={title({ className: cn(classNames?.title, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              AlertDescription                              */
/* -------------------------------------------------------------------------- */

export type AlertDescriptionProps = React.ComponentProps<"p"> & {
  unstyled?: boolean
}

const AlertDescription = ({
  unstyled,
  className,
  ...props
}: AlertDescriptionProps) => {
  const { description, classNames } = useAlertStyles(unstyled)

  return (
    <p
      data-slot="alert-description"
      className={description({
        className: cn(classNames?.description, className),
      })}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertIcon, AlertTitle, useAlertStyles }
