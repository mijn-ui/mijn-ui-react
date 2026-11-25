"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createContext,
  createTVUnstyledSlots,
  useTVUnstyled,
} from "@mijn-ui/react-core"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { VariantProps, tv } from "tailwind-variants"

const segmentedControlStyles = tv({
  slots: {
    // The theme's 8px radius, spelled as its variable: tailwind-merge does not
    // know the theme-only `rounded-base`, so it would keep it alongside a
    // `rounded-*` override instead of replacing it.
    base: "bg-bg-secondary rounded-(--mijn-radius-base) inline-flex max-w-full flex-wrap items-center p-0.5",
    item: [
      "text-fg-secondary inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-(--mijn-radius-sm) font-medium transition-colors",
      "not-aria-disabled:hover:text-fg-default focus-visible:outline-hidden focus-visible:ring-outline-brand focus-visible:ring-2",
      // The selected segment is keyed on ARIA rather than `data-state`: a
      // <TooltipTrigger asChild> around an item writes its own `data-state`
      // (open/closed) over Radix's, while aria-checked / aria-selected are
      // only ever set by the radio or tab underneath.
      "aria-checked:bg-bg-default-alt aria-checked:text-fg-default aria-checked:shadow-(--mijn-shadow-sm)",
      "aria-selected:bg-bg-default-alt aria-selected:text-fg-default aria-selected:shadow-(--mijn-shadow-sm)",
      "aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
    ],
    // fg-secondary, not fg-tertiary: tertiary is 4.43:1 on the light track and
    // 3.65:1 on the dark one, under the 4.5:1 that text this small needs.
    count: "text-fg-secondary font-normal tabular-nums",
  },
  variants: {
    size: {
      // `sm` is 32px overall, the height of <Button size="sm">.
      sm: { item: "h-7 px-3 text-sm" },
      xs: { item: "h-5 px-2 text-xs" },
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export type SegmentedControlVariantProps = VariantProps<
  typeof segmentedControlStyles
>
export type SegmentedControlSlots = keyof ReturnType<
  typeof segmentedControlStyles
>

export { segmentedControlStyles }

/**
 * What the choice IS, for assistive tech:
 * - `radio` — an answer the user gives. It may start unanswered.
 * - `tabs` — a filter that switches what a list or view shows.
 */
export type SegmentedControlSemantics = "radio" | "tabs"

/* -------------------------------------------------------------------------- */
/*                          SegmentedControlContext                           */
/* -------------------------------------------------------------------------- */

type SegmentedControlBaseProps =
  UnstyledComponentWithSlots<SegmentedControlSlots>

type SegmentedControlContextType = SegmentedControlBaseProps & {
  styles: ReturnType<typeof segmentedControlStyles>
  semantics: SegmentedControlSemantics
}

const [SegmentedControlProvider, useSegmentedControlContext] =
  createContext<SegmentedControlContextType>({
    name: "SegmentedControlContext",
    strict: true,
    errorMessage:
      "useSegmentedControlContext: `context` is undefined. Seems you forgot to wrap component within <SegmentedControl />",
  })

/* -------------------------------------------------------------------------- */
/*                            SegmentedControlHook                            */
/* -------------------------------------------------------------------------- */

const useSegmentedControlStyles = (unstyledOverride?: boolean) => {
  const context = useSegmentedControlContext()
  const unstyledSlots = useTVUnstyled(context, unstyledOverride)
  return { ...unstyledSlots, classNames: context.classNames }
}

/* -------------------------------------------------------------------------- */
/*                              SegmentedControl                              */
/* -------------------------------------------------------------------------- */

export type SegmentedControlProps<T extends string = string> = Omit<
  React.ComponentPropsWithRef<"div">,
  // `defaultValue` and `dir` clash with the props below. `onChange` would only
  // fire in radio mode inside a <form> (from Radix's hidden inputs), so it is
  // left out rather than half-working; use `onValueChange`.
  "defaultValue" | "dir" | "onChange"
> &
  SegmentedControlVariantProps &
  SegmentedControlBaseProps & {
    /**
     * The selected value, if controlled. `null` is controlled with nothing
     * selected yet — an unanswered question. `undefined` means uncontrolled,
     * as with React's own inputs.
     */
    value?: T | null
    /** The value selected on first render, if uncontrolled. */
    defaultValue?: T
    /** Called with the new value when the user picks a segment. */
    onValueChange?: (value: T) => void
    /** @default "radio" */
    semantics?: SegmentedControlSemantics
  }

const SegmentedControl = <T extends string = string>({
  value,
  defaultValue,
  onValueChange,
  semantics = "radio",
  size,
  unstyled = false,
  className,
  classNames,
  children,
  ...props
}: SegmentedControlProps<T>) => {
  const styles = segmentedControlStyles({ size })
  const { base } = createTVUnstyledSlots({ base: styles.base }, unstyled)

  const rootProps = {
    "data-slot": "segmented-control",
    className: base({ className: cn(classNames?.base, className) }),
    ...props,
  }
  // Radix reports plain strings; every value it can report came from an item.
  const handleValueChange = onValueChange as
    | ((value: string) => void)
    | undefined

  return (
    <SegmentedControlProvider
      value={{ unstyled, styles, classNames, semantics }}
    >
      {semantics === "tabs" ? (
        // `asChild` folds Root into List, so the tablist is the only element.
        <TabsPrimitive.Root
          asChild
          // Radix Tabs has no "nothing selected"; a value no tab has is the
          // closest it gets.
          value={value === null ? "" : value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
        >
          <TabsPrimitive.List {...rootProps}>{children}</TabsPrimitive.List>
        </TabsPrimitive.Root>
      ) : (
        <RadioGroupPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          {...rootProps}
        >
          {children}
        </RadioGroupPrimitive.Root>
      )}
    </SegmentedControlProvider>
  )
}

/* -------------------------------------------------------------------------- */
/*                            SegmentedControlItem                            */
/* -------------------------------------------------------------------------- */

export type SegmentedControlItemProps = Omit<
  React.ComponentPropsWithRef<"button">,
  "value" | "disabled"
> & {
  value: string
  /**
   * Makes the option unavailable: it is skipped by the arrow keys and cannot
   * be selected. It is marked with `aria-disabled` rather than the native
   * attribute, so it still receives hover — a tooltip can explain it.
   */
  disabled?: boolean
  /**
   * Why the option is unavailable. Setting it disables the option, and wires
   * the text up as the option's accessible description so it is read out.
   * The visible tooltip is yours to compose — see the README.
   */
  disabledReason?: string
  /** Shown after the label, muted: "To check 3". Format it yourself. */
  count?: number | string
  unstyled?: boolean
}

const SegmentedControlItem = ({
  value,
  disabled,
  disabledReason,
  count,
  unstyled,
  className,
  children,
  "aria-describedby": ariaDescribedBy,
  "aria-controls": ariaControls,
  ...props
}: SegmentedControlItemProps) => {
  const { semantics } = useSegmentedControlContext()
  const {
    item,
    count: countSlot,
    classNames,
  } = useSegmentedControlStyles(unstyled)
  const reasonId = React.useId()
  const isDisabled = Boolean(disabled || disabledReason)

  // Radix renders this button through `asChild`, so the props here win over
  // its own. That is how the option keeps hover: Radix is told it is disabled
  // (which takes it out of the arrow-key order and blocks selection) but the
  // native `disabled` attribute it would add is overridden.
  //
  // `data-slot` comes after the spread so a <TooltipTrigger asChild> wrapped
  // around the item cannot rename it "tooltip-trigger".
  const segment = (
    <button
      {...props}
      data-slot="segmented-control-item"
      disabled={false}
      aria-disabled={isDisabled || undefined}
      aria-describedby={
        [ariaDescribedBy, disabledReason && reasonId]
          .filter(Boolean)
          .join(" ") || undefined
      }
      // Radix points every tab at a panel id it would render with
      // <Tabs.Content>. A segmented filter has no such panels, so the default
      // would be a dangling reference; pass your own to name the region.
      aria-controls={ariaControls}
      className={item({ className: cn(classNames?.item, className) })}
      onClick={(event) => {
        props.onClick?.(event)
        // An aria-disabled button still clicks; keep Radix from selecting it.
        if (isDisabled) event.preventDefault()
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event)
        // Radix Tabs selects on Space/Enter without checking `disabled`, since
        // a natively disabled tab could never have focus.
        if (isDisabled && (event.key === " " || event.key === "Enter")) {
          event.preventDefault()
        }
      }}
    >
      {children}
      {/* The space keeps the accessible name "To check 3", not "To check3";
          layout ignores it, the gap does the spacing. */}
      {count != null && (
        <>
          {" "}
          <span
            data-slot="segmented-control-count"
            className={countSlot({ className: classNames?.count })}
          >
            {count}
          </span>
        </>
      )}
      {disabledReason && (
        <span id={reasonId} hidden>
          {disabledReason}
        </span>
      )}
    </button>
  )

  return semantics === "tabs" ? (
    <TabsPrimitive.Trigger asChild value={value} disabled={isDisabled}>
      {segment}
    </TabsPrimitive.Trigger>
  ) : (
    <RadioGroupPrimitive.Item asChild value={value} disabled={isDisabled}>
      {segment}
    </RadioGroupPrimitive.Item>
  )
}

export {
  SegmentedControl,
  SegmentedControlItem,
  useSegmentedControlContext,
  useSegmentedControlStyles,
}
