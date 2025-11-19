"use client"

import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { UnstyledComponentWithSlots } from "@mijn-ui/react-core"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const alertStyles = tv({
  slots: {
    base: "group relative w-full rounded-lg px-3 py-4 [&>span~*]:pl-8",
    iconWrapper:
      "translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-5 [&>svg]:text-current",
    title: "w-full font-semibold leading-none",
    description: "mt-1 text-sm",
  },
  variants: {
    variant: {
      danger: {
        base: "border-outline-danger text-fg-danger border",
      },
      default: {
        base: "border-outline-default text-fg-default border",
        description: "text-fg-secondary",
      },
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
        className={base({ className: cnBase(classNames?.base, className) })}
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
      className={iconWrapper({
        className: cnBase(classNames?.iconWrapper, className),
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
      className={title({ className: cnBase(classNames?.title, className) })}
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
      className={description({
        className: cnBase(classNames?.description, className),
      })}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertIcon, AlertTitle, useAlertStyles }
