"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  AlertSlots,
  AlertVariantProps,
  UnstyledComponentWithSlots,
  UnstyledProps,
  alertStyles,
  cn,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"

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
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </AlertProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  AlertIcon                                 */
/* -------------------------------------------------------------------------- */

export type AlertIconProps = React.ComponentProps<"span"> & UnstyledProps

const AlertIcon = ({ unstyled, className, ...props }: AlertIconProps) => {
  const { iconWrapper, classNames } = useAlertStyles(unstyled)

  return (
    <span
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

export type AlertTitleProps = React.ComponentProps<"h5"> & UnstyledProps

const AlertTitle = ({ unstyled, className, ...props }: AlertTitleProps) => {
  const { title, classNames } = useAlertStyles(unstyled)

  return (
    <h5
      className={title({ className: cn(classNames?.title, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              AlertDescription                              */
/* -------------------------------------------------------------------------- */

export type AlertDescriptionProps = React.ComponentProps<"p"> & UnstyledProps

const AlertDescription = ({
  unstyled,
  className,
  ...props
}: AlertDescriptionProps) => {
  const { description, classNames } = useAlertStyles(unstyled)

  return (
    <p
      className={description({
        className: cn(classNames?.description, className),
      })}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertIcon, AlertTitle, useAlertStyles }
