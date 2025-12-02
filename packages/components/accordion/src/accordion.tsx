"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { ChevronDownIcon } from "@mijn-ui/shared-icons"
import * as RadixAccordion from "@radix-ui/react-accordion"
import { VariantProps, tv } from "tailwind-variants"

const accordionStyles = tv({
  slots: {
    base: "",
    item: "border-outline-default",
    triggerWrapper: "",
    trigger:
      "group flex w-full items-center justify-between py-4 text-sm font-medium leading-none hover:underline",
    icon: "text-fg-secondary size-4 shrink-0 duration-300 ease-in-out group-data-[state=open]:rotate-180",
    contentWrapper:
      "data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open text-fg-secondary overflow-hidden text-sm transition-[height]",
    content: "pb-4 pt-0 text-sm leading-tight",
  },
  variants: {
    variant: {
      default: {
        item: "border-b",
      },
      contained: {
        base: "py-2 px-4 bg-bg-secondary rounded-lg border divide-y divide-y-outline-default",
      },
      splitted: {
        base: "space-y-1.5",
        item: "bg-bg-secondary px-4 rounded-lg border border-outline-default",
      },
      subtle: {
        base: "rounded-lg overflow-hidden divide-y",
        item: "border-outline-secondary",
        trigger: "bg-bg-secondary px-4",
        content: "p-4 bg-bg-tertiary",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type AccordionVariantProps = VariantProps<typeof accordionStyles>
export type AccordionSlots = keyof ReturnType<typeof accordionStyles>
export { accordionStyles }

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
> & { unstyled?: boolean }

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
> & { unstyled?: boolean } & {
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
        className={trigger({
          className: cn(classNames?.trigger, className),
        })}
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
> & { unstyled?: boolean }

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
        className={content({
          className: cn(classNames?.content, className),
        })}
      >
        {children}
      </div>
    </RadixAccordion.Content>
  )
}

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  useAccordionStyles,
}
