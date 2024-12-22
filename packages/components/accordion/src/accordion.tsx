"use client"

import * as React from "react"
import {
  createTVUnstyledSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
} from "@mijn-ui/react-core"
import { createContext } from "@mijn-ui/react-utilities"
import * as RadixAccordion from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@mijn-ui/shared-icons"
import {
  AccordionSlots,
  AccordionVariantProps,
  accordionStyles,
} from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import { cn } from "@mijn-ui/react-utilities"

/* -------------------------------------------------------------------------- */
/*                              AccordionContext                              */
/* -------------------------------------------------------------------------- */

type AccordionBaseProps = UnstyledComponentWithSlots<AccordionSlots>

type AccordionContextType = AccordionBaseProps & {
  styles: ReturnType<typeof accordionStyles>
}

const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContextType>({
    name: "AccordionContext",
    strict: true,
    errorMessage:
      "useAccordionContext: `context` is undefined. Ensure the component is wrapped within <Accordion />",
  })

/* -------------------------------------------------------------------------- */
/*                                AccordionHook                               */
/* -------------------------------------------------------------------------- */

const useAccordionStyles = (unstyledOverride?: boolean) => {
  const context = useAccordionContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}
/* -------------------------------------------------------------------------- */
/*                                  Accordion                                 */
/* -------------------------------------------------------------------------- */

export type AccordionProps = React.ComponentPropsWithRef<
  typeof RadixAccordion.Root
> &
  AccordionVariantProps &
  AccordionBaseProps

const Accordion = ({
  className,
  classNames,
  unstyled = false,
  variant,
  ...props
}: AccordionProps) => {
  const styles = accordionStyles({ variant })
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <AccordionProvider value={{ classNames, unstyled, styles }}>
      <RadixAccordion.Root
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      />
    </AccordionProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                AccordionItem                               */
/* -------------------------------------------------------------------------- */

export type AccordionItemProps = React.ComponentPropsWithRef<
  typeof RadixAccordion.Item
> &
  UnstyledProps

const AccordionItem = ({
  className,
  unstyled,
  ...props
}: AccordionItemProps) => {
  const { item, classNames } = useAccordionStyles(unstyled)

  return (
    <RadixAccordion.Item
      className={item({ className: cn(classNames?.item, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                              AccordionTrigger                              */
/* -------------------------------------------------------------------------- */

export type AccordionTriggerProps = React.ComponentPropsWithRef<
  typeof RadixAccordion.Trigger
> &
  UnstyledProps & {
    icon?: React.ReactNode
  }

const AccordionTrigger = ({
  className,
  icon,
  unstyled,
  children,
  ...props
}: AccordionTriggerProps) => {
  const {
    classNames,
    triggerWrapper,
    trigger,
    icon: iconStyles,
  } = useAccordionStyles(unstyled)

  return (
    <RadixAccordion.Header
      className={triggerWrapper({ className: classNames?.triggerWrapper })}
    >
      <RadixAccordion.Trigger
        className={trigger({ className: cn(classNames?.trigger, className) })}
        {...props}
      >
        {children}
        {icon ? (
          icon
        ) : (
          <ChevronDownIcon
            className={iconStyles({ className: classNames?.icon })}
          />
        )}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
}

/* -------------------------------------------------------------------------- */
/*                            AccordionContentProps                           */
/* -------------------------------------------------------------------------- */

export type AccordionContentProps = React.ComponentPropsWithRef<
  typeof RadixAccordion.Content
> &
  UnstyledProps

const AccordionContent = ({
  className,
  unstyled,
  children,
  ...props
}: AccordionContentProps) => {
  const { contentWrapper, content, classNames } = useAccordionStyles(unstyled)

  return (
    <RadixAccordion.Content
      className={contentWrapper({ className: classNames?.contentWrapper })}
      {...props}
    >
      <div
        className={content({ className: cn(classNames?.content, className) })}
      >
        {children}
      </div>
    </RadixAccordion.Content>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Exports                                     */
/* -------------------------------------------------------------------------- */

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useAccordionStyles,
  accordionStyles,
}
