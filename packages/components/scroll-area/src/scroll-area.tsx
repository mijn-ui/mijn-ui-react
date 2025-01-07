"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { useTVUnstyled } from "@mijn-ui/react-hooks"
import {
  ScrollAreaSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
  cn,
  scrollAreaStyles,
} from "@mijn-ui/react-theme"
import { createContext } from "@mijn-ui/react-utilities"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

/* -------------------------------------------------------------------------- */
/*                              ScrollAreaContext                             */
/* -------------------------------------------------------------------------- */

type ScrollAreaBaseProps = UnstyledComponentWithSlots<ScrollAreaSlots>

type ScrollAreaContextType = ScrollAreaBaseProps & {
  styles: ReturnType<typeof scrollAreaStyles>
}

const [ScrollAreaProvider, useScrollAreaContext] =
  createContext<ScrollAreaContextType>({
    name: "ScrollAreaContext",
    strict: true,
    errorMessage:
      "useScrollAreaContext: `context` is undefined. Seems you forgot to wrap component within <ScrollArea />",
  })

/* -------------------------------------------------------------------------- */
/*                               ScrollAreaHook                               */
/* -------------------------------------------------------------------------- */

const useScrollAreaStyles = (unstyledOverride?: boolean) => {
  const context = useScrollAreaContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                 ScrollArea                                 */
/* -------------------------------------------------------------------------- */

export type ScrollAreaProps = React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.Root
> &
  ScrollAreaBaseProps

const ScrollArea = ({
  unstyled,
  classNames,
  className,
  children,
  ...props
}: ScrollAreaProps) => {
  const styles = scrollAreaStyles()
  const { base, viewport } = createTVUnstyledSlots(styles, unstyled)

  return (
    <ScrollAreaProvider value={{ unstyled, styles }}>
      <ScrollAreaPrimitive.Root
        className={base({ className: cn(classNames?.base, className) })}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          className={viewport({ className: classNames?.viewport })}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    </ScrollAreaProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  ScrollBar                                 */
/* -------------------------------------------------------------------------- */

type ScrollBarProps = React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> &
  UnstyledProps

const ScrollBar = ({
  unstyled,
  className,
  orientation = "vertical",
  ...props
}: ScrollBarProps) => {
  const { scrollbar, scrollThumb, classNames } = useScrollAreaStyles(unstyled)

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      orientation={orientation}
      className={scrollbar({
        orientation,
        className: cn(classNames?.scrollbar, className),
      })}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={scrollThumb({ className: classNames?.scrollThumb })}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
