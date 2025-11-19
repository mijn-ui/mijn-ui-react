"use client"

import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { UnstyledComponentWithSlots } from "@mijn-ui/react-core"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const tabsStyles = tv({
  slots: {
    base: "",
    list: "flex flex-col items-stretch sm:flex-row sm:items-center",
    trigger: [
      "text-fg-secondary hover:bg-bg-secondary focus-visible:bg-bg-secondary active:bg-bg-secondary/70 data-[state=active]:border-b-outline-brand data-[state=active]:text-fg-brand-emphasis data-[state=active]:hover:text-fg-brand-emphasis inline-flex h-9 items-center justify-center gap-1.5 border-b px-3 text-sm font-normal leading-none outline-none duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:font-medium data-[state=active]:hover:bg-transparent",
    ],
    content:
      "focus-visible:ring-outline-brand mt-2 focus-visible:outline-none focus-visible:ring-1",
  },
})
export type TabsVariantProps = VariantProps<typeof tabsStyles>
export type TabsSlots = keyof ReturnType<typeof tabsStyles>

export { tabsStyles }

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
        className={base({ className: cnBase(classNames?.base, className) })}
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
export type TabsListProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.List
> & { unstyled?: boolean }

const TabsList = ({ className, unstyled, ...props }: TabsListProps) => {
  const { list, classNames } = useTabsStyles(unstyled)

  return (
    <TabsPrimitive.List
      className={list({
        className: cnBase(classNames?.list, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 TabsTrigger                                */
/* -------------------------------------------------------------------------- */

export type TabsTriggerProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.Trigger
> & { unstyled?: boolean }

const TabsTrigger = ({ className, unstyled, ...props }: TabsTriggerProps) => {
  const { trigger, classNames } = useTabsStyles(unstyled)

  return (
    <TabsPrimitive.Trigger
      className={trigger({
        className: cnBase(classNames?.trigger, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                                 TabsContent                                */
/* -------------------------------------------------------------------------- */

export type TabsContentProps = React.ComponentPropsWithRef<
  typeof TabsPrimitive.Content
> & { unstyled?: boolean }

const TabsContent = ({ className, unstyled, ...props }: TabsContentProps) => {
  const { content, classNames } = useTabsStyles(unstyled)

  return (
    <TabsPrimitive.Content
      className={content({
        className: cnBase(classNames?.content, className),
      })}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useTabsContext,
  useTabsStyles,
}
