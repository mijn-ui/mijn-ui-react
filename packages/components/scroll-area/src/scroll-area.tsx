"use client"

import * as React from "react"
import { cn, createContext } from "@mijn-ui/react-utilities"
import {
  createTVUnstyledSlots,
  UnstyledComponentWithSlots,
  UnstyledProps,
} from "@mijn-ui/react-core"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
import { scrollAreaStyles, ScrollAreaSlots } from "@mijn-ui/react-theme"
import { useTVUnstyled } from "@mijn-ui/react-hooks"

/* -------------------------------------------------------------------------- */
/*                             ScrollAreaContext                              */
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
/*                              ScrollAreaHook                                */
/* -------------------------------------------------------------------------- */

const useScrollAreaStyles = (unstyledOverride?: boolean) => {
  const context = useScrollAreaContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                ScrollArea                                  */
/* -------------------------------------------------------------------------- */

type ScrollAreaProps = React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.Root
> &
  ScrollAreaBaseProps

const ScrollArea = ({
  className,
  classNames,
  unstyled = false,
  ...props
}: ScrollAreaProps) => {
  const styles = scrollAreaStyles()
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  return (
    <ScrollAreaProvider value={{ unstyled, styles, classNames }}>
      <ScrollAreaPrimitive.Root
        className={base({
          className: cn(classNames?.base, className),
        })}
        {...props}
      />
    </ScrollAreaProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                             ScrollAreaViewport                             */
/* -------------------------------------------------------------------------- */

type ScrollAreaViewportProps = React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.Viewport
> &
  UnstyledProps

const ScrollAreaViewport = ({
  className,
  unstyled,
  ...props
}: ScrollAreaViewportProps) => {
  const { viewport, classNames } = useScrollAreaStyles(unstyled)

  return (
    <ScrollAreaPrimitive.Viewport
      className={viewport({
        className: cn(classNames?.viewport, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                             ScrollAreaScrollbar                            */
/* -------------------------------------------------------------------------- */

type ScrollAreaScrollbarProps = React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.Scrollbar
> &
  UnstyledProps & {
    orientation: "horizontal" | "vertical"
  }

const ScrollAreaScrollbar = ({
  className,
  unstyled,
  orientation,
  ...props
}: ScrollAreaScrollbarProps) => {
  const { scrollbar, classNames } = useScrollAreaStyles(unstyled)

  return (
    <ScrollAreaPrimitive.Scrollbar
      className={scrollbar({
        className: cn(classNames?.scrollbar, className),
      })}
      orientation={orientation}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                             ScrollAreaThumb                                */
/* -------------------------------------------------------------------------- */

type ScrollAreaThumbProps = React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.Thumb
> &
  UnstyledProps

const ScrollAreaThumb = ({
  className,
  unstyled,
  ...props
}: ScrollAreaThumbProps) => {
  const { thumb, classNames } = useScrollAreaStyles(unstyled)

  return (
    <ScrollAreaPrimitive.Thumb
      className={thumb({
        className: cn(classNames?.thumb, className),
      })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                             ScrollAreaCorner                               */
/* -------------------------------------------------------------------------- */

type ScrollAreaCornerProps = React.ComponentPropsWithRef<
  typeof ScrollAreaPrimitive.Corner
> &
  UnstyledProps

const ScrollAreaCorner = ({
  className,
  unstyled,
  ...props
}: ScrollAreaCornerProps) => {
  const { corner, classNames } = useScrollAreaStyles(unstyled)

  return (
    <ScrollAreaPrimitive.Corner
      className={corner({
        className: cn(classNames?.corner, className),
      })}
      {...props}
    />
  )
}

export {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
}
