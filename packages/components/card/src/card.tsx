"use client"

import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { UnstyledComponentWithSlots } from "@mijn-ui/react-core"
import { VariantProps, cnBase, tv } from "tailwind-variants"

/* -------------------------------------------------------------------------- */
/*                              CardContext                                   */
/* -------------------------------------------------------------------------- */

const cardStyles = tv({
  slots: {
    base: "bg-bg-default text-fg-default border border-outline-secondary rounded-lg shadow-sm",
    header: "flex flex-col space-y-1.5 p-4",
    content: "p-4 pt-0",
    footer: "flex items-center p-4 pt-0",
    title: "text-2xl font-semibold leading-none tracking-tight",
    description: "text-fg-secondary text-sm",
  },
})

export type CardVariantProps = VariantProps<typeof cardStyles>
export type CardSlots = keyof ReturnType<typeof cardStyles>
export { cardStyles }

type CardBaseProps = UnstyledComponentWithSlots<CardSlots>

type CardContextType = CardBaseProps & {
  styles: ReturnType<typeof cardStyles>
}

const [CardProvider, useCardContext] = createContext<CardContextType>({
  name: "CardContext",
  strict: true,
  errorMessage:
    "useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />",
})

/* -------------------------------------------------------------------------- */
/*                                  CardHook                                  */
/* -------------------------------------------------------------------------- */

const useCardStyles = (unstyledOverride?: boolean) => {
  const context = useCardContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

export type CardProps = React.ComponentProps<"div"> & CardBaseProps

const Card = ({
  className,
  classNames,
  unstyled = false,
  ...props
}: CardProps) => {
  const styles = cardStyles()
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <CardProvider value={{ unstyled, styles, classNames }}>
      <div
        className={base({
          className: cnBase(classNames?.base, className),
        })}
        {...props}
      />
    </CardProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CardHeader                                 */
/* -------------------------------------------------------------------------- */

export type CardHeaderProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const CardHeader = ({ className, unstyled, ...props }: CardHeaderProps) => {
  const { header, classNames } = useCardStyles(unstyled)

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
/*                                  CardTitle                                 */
/* -------------------------------------------------------------------------- */

export type CardTitleProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const CardTitle = ({ className, unstyled, ...props }: CardTitleProps) => {
  const { title, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={title({
        className: cnBase(classNames?.title, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                               CardDescription                              */
/* -------------------------------------------------------------------------- */

export type CardDescriptionProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const CardDescription = ({
  className,
  unstyled,
  ...props
}: CardDescriptionProps) => {
  const { description, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={description({
        className: cnBase(classNames?.description, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CardContent                                */
/* -------------------------------------------------------------------------- */

export type CardContentProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const CardContent = ({ className, unstyled, ...props }: CardContentProps) => {
  const { content, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={content({
        className: cnBase(classNames?.content, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CardFooter                                 */
/* -------------------------------------------------------------------------- */

export type CardFooterProps = React.ComponentPropsWithRef<"div"> & {
  unstyled?: boolean
}

const CardFooter = ({ className, unstyled, ...props }: CardFooterProps) => {
  const { footer, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={footer({
        className: cnBase(classNames?.footer, className),
      })}
      {...props}
    />
  )
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  useCardStyles,
}
