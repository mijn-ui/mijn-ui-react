"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  AccordionSlots,
  AccordionVariantProps,
  UnstyledComponentWithSlots,
  UnstyledProps,
  accordionStyles,
  cn,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import { ChevronDownIcon } from "@mijn-ui/shared-icons"
import * as RadixAccordion from "@radix-ui/react-accordion"

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
  ...props
}: AccordionProps) => {
  const styles = accordionStyles()
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
}
