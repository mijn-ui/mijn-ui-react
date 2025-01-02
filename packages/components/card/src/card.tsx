"use client"

import * as React from 'react';

import { createTVUnstyledSlots } from '@mijn-ui/react-core';
import { useTVUnstyled } from '@mijn-ui/react-hooks';
import {
  CardSlots,
  cardStyles,
  cn,
  UnstyledComponentWithSlots,
  UnstyledProps,
} from '@mijn-ui/react-theme';
import { createContext } from '@mijn-ui/react-utilities';

/* -------------------------------------------------------------------------- */
/*                              CardContext                                   */
/* -------------------------------------------------------------------------- */

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
          className: cn(classNames?.base, className),
        })}
        {...props}
      />
    </CardProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CardHeader                                 */
/* -------------------------------------------------------------------------- */

type CardHeaderProps = React.ComponentPropsWithRef<"div"> & UnstyledProps

const CardHeader = ({ className, unstyled, ...props }: CardHeaderProps) => {
  const { header, classNames } = useCardStyles(unstyled)

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
/*                                  CardTitle                                 */
/* -------------------------------------------------------------------------- */

type CardTitleProps = React.ComponentPropsWithRef<"div"> & UnstyledProps

const CardTitle = ({ className, unstyled, ...props }: CardTitleProps) => {
  const { title, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={title({
        className: cn(classNames?.title, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                               CardDescription                              */
/* -------------------------------------------------------------------------- */

type CardDescriptionProps = React.ComponentPropsWithRef<"div"> & UnstyledProps

const CardDescription = ({
  className,
  unstyled,
  ...props
}: CardDescriptionProps) => {
  const { description, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={description({
        className: cn(classNames?.description, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CardContent                                */
/* -------------------------------------------------------------------------- */

type CardContentProps = React.ComponentPropsWithRef<"div"> & UnstyledProps

const CardContent = ({ className, unstyled, ...props }: CardContentProps) => {
  const { content, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={content({
        className: cn(classNames?.content, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 CardFooter                                 */
/* -------------------------------------------------------------------------- */

type CardFooterProps = React.ComponentPropsWithRef<"div"> & UnstyledProps

const CardFooter = ({ className, unstyled, ...props }: CardFooterProps) => {
  const { footer, classNames } = useCardStyles(unstyled)

  return (
    <div
      className={footer({
        className: cn(classNames?.footer, className),
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
};
