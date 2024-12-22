"use client"

import * as React from "react"
import { createContext } from "@mijn-ui/react-utilities"
import {
  createTVUnstyledSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
} from "@mijn-ui/react-core"
import {
  AlertSlots,
  alertStyles,
  AlertVariantProps,
} from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import { cn } from "@mijn-ui/react-utilities"

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
  color,
  unstyled = false,
  className,
  classNames,
  ...props
}: AlertProps) => {
  const styles = alertStyles({ variant, color })
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

type AlertIconProps = React.ComponentProps<"span"> & UnstyledProps

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

type AlertTitle = React.ComponentProps<"h5"> & UnstyledProps

const AlertTitle = ({ unstyled, className, ...props }: AlertTitle) => {
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

type AlertDescriptionProps = React.ComponentProps<"p"> & UnstyledProps

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

export { Alert, AlertDescription, AlertIcon, AlertTitle }
