"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as RadixTooltip from "@radix-ui/react-tooltip"
import { VariantProps, tv } from "tailwind-variants"

const tooltipStyles = tv({
  slots: {
    base: "",
    trigger: "",
    content: [
      "data-[state=delayed-open]:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0",
      "data-[state=instant-open]:zoom-in-95 data-[state=instant-open]:animate-in data-[state=instant-open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-left-1 data-[side=right]:slide-in-from-right-1 data-[side=top]:slide-in-from-top-1",
      "bg-bg-inverse text-fg-inverse z-50 max-w-xs text-balance rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md duration-150",
    ],
    arrow: "bg-bg-inverse fill-bg-inverse",
  },
})

export type TooltipVariantProps = VariantProps<typeof tooltipStyles>
export type TooltipSlots = keyof ReturnType<typeof tooltipStyles>

export { tooltipStyles }

/* -------------------------------------------------------------------------- */
/*                               TooltipProvider                              */
/* -------------------------------------------------------------------------- */

/**
 * Required ancestor for every <Tooltip />. Mount it once, near the root of the
 * app, so a single shared timer governs the hover delay across all tooltips —
 * which is what makes moving between two triggers feel instant rather than
 * re-waiting the full delay each time.
 */
export type TooltipProviderProps = React.ComponentPropsWithoutRef<
  typeof RadixTooltip.Provider
>

const TooltipProvider = ({
  delayDuration = 200,
  ...props
}: TooltipProviderProps) => (
  <RadixTooltip.Provider delayDuration={delayDuration} {...props} />
)

/* -------------------------------------------------------------------------- */
/*                               TooltipContext                               */
/* -------------------------------------------------------------------------- */

type TooltipBaseProps = UnstyledComponentWithSlots<TooltipSlots>

type TooltipContextType = TooltipBaseProps & {
  styles: ReturnType<typeof tooltipStyles>
}

const [TooltipProviderCtx, useTooltipContext] =
  createContext<TooltipContextType>({
    name: "TooltipContext",
    strict: true,
    errorMessage:
      "useTooltipContext: `context` is undefined. Seems you forgot to wrap component within <Tooltip />",
  })

/* -------------------------------------------------------------------------- */
/*                                 TooltipHook                                */
/* -------------------------------------------------------------------------- */

const useTooltipStyles = (unstyledOverride?: boolean) => {
  const context = useTooltipContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                                   Tooltip                                  */
/* -------------------------------------------------------------------------- */

export type TooltipProps = React.ComponentPropsWithoutRef<
  typeof RadixTooltip.Root
> &
  TooltipBaseProps

const Tooltip = ({ unstyled = false, classNames, ...props }: TooltipProps) => {
  const styles = tooltipStyles()

  return (
    <TooltipProviderCtx value={{ unstyled, styles, classNames }}>
      <RadixTooltip.Root data-slot="tooltip" {...props} />
    </TooltipProviderCtx>
  )
}

/* -------------------------------------------------------------------------- */
/*                               TooltipTrigger                               */
/* -------------------------------------------------------------------------- */

export type TooltipTriggerProps = React.ComponentPropsWithRef<
  typeof RadixTooltip.Trigger
> & { unstyled?: boolean }

const TooltipTrigger = ({
  unstyled,
  className,
  ...props
}: TooltipTriggerProps) => {
  const { trigger, classNames } = useTooltipStyles(unstyled)

  return (
    <RadixTooltip.Trigger
      data-slot="tooltip-trigger"
      className={trigger({ className: cn(classNames?.trigger, className) })}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*                               TooltipContent                               */
/* -------------------------------------------------------------------------- */

export type TooltipContentProps = React.ComponentPropsWithRef<
  typeof RadixTooltip.Content
> & { unstyled?: boolean }

const TooltipContent = ({
  unstyled,
  className,
  side = "top",
  sideOffset = 6,
  ...props
}: TooltipContentProps) => {
  const { content, classNames } = useTooltipStyles(unstyled)

  return (
    <RadixTooltip.Portal data-slot="tooltip-portal">
      <RadixTooltip.Content
        data-slot="tooltip-content"
        side={side}
        sideOffset={sideOffset}
        className={content({ className: cn(classNames?.content, className) })}
        {...props}
      />
    </RadixTooltip.Portal>
  )
}

/* -------------------------------------------------------------------------- */
/*                                TooltipArrow                                */
/* -------------------------------------------------------------------------- */

export type TooltipArrowProps = React.ComponentPropsWithRef<
  typeof RadixTooltip.Arrow
> & { unstyled?: boolean }

const TooltipArrow = ({ unstyled, className, ...props }: TooltipArrowProps) => {
  const { arrow, classNames } = useTooltipStyles(unstyled)

  return (
    <RadixTooltip.Arrow
      data-slot="tooltip-arrow"
      className={arrow({ className: cn(classNames?.arrow, className) })}
      {...props}
    />
  )
}

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useTooltipStyles,
}
