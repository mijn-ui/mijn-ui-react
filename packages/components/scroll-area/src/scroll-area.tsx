"use client"

import * as React from "react"
import {
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import { UnstyledComponentWithSlots } from "@mijn-ui/react-core"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { VariantProps, cnBase, tv } from "tailwind-variants"

const scrollAreaStyles = tv({
  slots: {
    base: "relative overflow-hidden",
    viewport: "size-full rounded-[inherit]",
    scrollbar: "flex touch-none select-none transition-colors",
    scrollThumb: "bg-outline-default relative flex-1 rounded-full",
  },
  variants: {
    orientation: {
      vertical: {
        scrollbar: "h-full w-2.5 border-l border-l-transparent p-px",
      },
      horizontal: {
        scrollbar: "h-2.5 flex-col border-t border-t-transparent p-px",
      },
    },
  },
})

export type ScrollAreaVariantProps = VariantProps<typeof scrollAreaStyles>
export type ScrollAreaSlots = keyof ReturnType<typeof scrollAreaStyles>

export { scrollAreaStyles }

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
        className={base({ className: cnBase(classNames?.base, className) })}
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
> & { unstyled?: boolean }

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
        className: cnBase(classNames?.scrollbar, className),
      })}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={scrollThumb({ className: classNames?.scrollThumb })}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar, useScrollAreaStyles }
