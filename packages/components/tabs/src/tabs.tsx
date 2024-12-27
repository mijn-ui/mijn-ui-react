"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import {
  UnstyledComponentWithSlots,
  UnstyledProps,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { cn, createContext } from "@mijn-ui/react-utilities"
import { tabsStyles, TabsSlots } from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"

/* -------------------------------------------------------------------------- */
/*                                 TabsContext                                */
/* -------------------------------------------------------------------------- */

type TabsBaseProps = UnstyledComponentWithSlots<TabsSlots>

type TabsContextType = TabsBaseProps & { styles: ReturnType<typeof tabsStyles> }

const [TabsProvider, useTabsContext] = createContext<TabsContextType>({
  name: "TabsContext",
  strict: true,
  errorMessage:
    "useTabsContext: `context` is undefined. Seems you forgot to wrap component within <Tabs />",
})

/* -------------------------------------------------------------------------- */
/*                                  TabsHook                                  */
/* -------------------------------------------------------------------------- */

const useTabsStyles = (unstyledOverride?: boolean) => {
  const context = useTabsContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                    Tabs                                    */
/* -------------------------------------------------------------------------- */

export type TabsProps = React.ComponentPropsWithRef<typeof TabsPrimitive.Root> &
  TabsBaseProps

const Tabs = ({
  children,
  className,
  classNames,
  unstyled = false,
  ...props
}: TabsProps) => {
  const styles = tabsStyles()
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <TabsProvider value={{ unstyled, styles, classNames }}>
      <TabsPrimitive.Root
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  TabsList                                  */
/* -------------------------------------------------------------------------- */

type TabsListProps = React.ComponentPropsWithRef<typeof TabsPrimitive.List> &
  UnstyledProps

const TabsList = ({ className, unstyled, ...props }: TabsListProps) => {
  const { list, classNames } = useTabsStyles(unstyled)

  return (
    <TabsPrimitive.List
      className={list({
        className: cn(classNames?.list, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 TabsTrigger                                */
/* -------------------------------------------------------------------------- */

type TabsTriggerProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.Trigger
> &
  UnstyledProps

const TabsTrigger = ({ className, unstyled, ...props }: TabsTriggerProps) => {
  const { trigger, classNames } = useTabsStyles(unstyled)

  return (
    <TabsPrimitive.Trigger
      className={trigger({
        className: cn(classNames?.trigger, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 TabsContent                                */
/* -------------------------------------------------------------------------- */

type TabsContentProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.Content
> &
  UnstyledProps

const TabsContent = ({ className, unstyled, ...props }: TabsContentProps) => {
  const { content, classNames } = useTabsStyles(unstyled)

  return (
    <TabsPrimitive.Content
      className={content({
        className: cn(classNames?.content, className),
      })}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
