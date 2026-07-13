"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"
import { ChartHue, HUE_BG_MAP } from "./chart-utils"

const chartLegendStyles = tv({
  slots: {
    base: "flex gap-x-4 gap-y-1 text-xs",
    item: "flex min-w-0 items-center gap-1.5",
    swatch: "rounded-2xs size-2.5 shrink-0",
    label: "text-fg-secondary truncate",
    value: "text-fg-default font-medium",
  },
  variants: {
    orientation: {
      horizontal: { base: "flex-row flex-wrap items-center" },
      vertical: { base: "flex-col items-start" },
    },
    clickable: {
      true: { item: "cursor-pointer select-none transition-opacity hover:opacity-75" },
    },
    hidden: {
      true: { item: "opacity-45", label: "line-through" },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export type ChartLegendVariantProps = VariantProps<typeof chartLegendStyles>
export type ChartLegendSlots = keyof ReturnType<typeof chartLegendStyles>

export { chartLegendStyles }

/* -------------------------------------------------------------------------- */
/*                               ChartLegendItem                              */
/* -------------------------------------------------------------------------- */

export type ChartLegendItemData = {
  label: string
  color: ChartHue
  value?: string
  /** Marks the series as toggled off (dimmed swatch, struck-through label). */
  hidden?: boolean
}

export type ChartLegendItemProps =
  UnstyledComponentWithSlots<ChartLegendSlots> &
    React.ComponentPropsWithRef<"div"> &
    ChartLegendItemData & {
      /** When set the item renders as a button and calls this on click. */
      onToggle?: () => void
    }

const ChartLegendItem = ({
  className,
  classNames,
  unstyled,
  label: labelText,
  color,
  value: valueText,
  hidden = false,
  onToggle,
  ref,
  ...props
}: ChartLegendItemProps) => {
  const { item, swatch, label, value } = createTVUnstyledSlots(
    chartLegendStyles(),
    unstyled,
  )

  return (
    <div
      data-slot="chart-legend-item"
      ref={ref}
      // Stays a div (single ref type); toggleable items get full button
      // semantics via ARIA + keyboard handling instead of polymorphism.
      {...(onToggle && {
        role: "button",
        tabIndex: 0,
        "aria-pressed": !hidden,
        onClick: onToggle,
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onToggle()
          }
        },
      })}
      // Per-call variants are passed to the slot alone and extra classes
      // merged outside — the core slot wrapper drops variant args when a
      // `className` is present in the same object.
      className={cn(
        item({ clickable: !!onToggle, hidden }),
        classNames?.item,
        className,
      )}
      {...props}
    >
      <span
        data-slot="chart-legend-swatch"
        aria-hidden
        className={swatch({
          className: cn(!unstyled && HUE_BG_MAP[color], classNames?.swatch),
        })}
      />
      <span
        data-slot="chart-legend-label"
        className={cn(label({ hidden }), classNames?.label)}
      >
        {labelText}
      </span>
      {valueText !== undefined && (
        <span
          data-slot="chart-legend-value"
          className={value({ className: classNames?.value })}
        >
          {valueText}
        </span>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 ChartLegend                                */
/* -------------------------------------------------------------------------- */

export type ChartLegendProps = UnstyledComponentWithSlots<ChartLegendSlots> &
  React.ComponentPropsWithRef<"div"> & {
    items: ChartLegendItemData[]
    orientation?: ChartLegendVariantProps["orientation"]
    /** When set every item becomes a toggle button (series show/hide). */
    onItemToggle?: (index: number, item: ChartLegendItemData) => void
  }

const ChartLegend = ({
  className,
  classNames,
  unstyled,
  items,
  orientation,
  onItemToggle,
  ref,
  ...props
}: ChartLegendProps) => {
  const { base } = createTVUnstyledSlots(
    chartLegendStyles({ orientation }),
    unstyled,
  )

  return (
    <div
      data-slot="chart-legend"
      ref={ref}
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      {items.map((item, index) => (
        <ChartLegendItem
          key={index}
          unstyled={unstyled}
          classNames={classNames}
          onToggle={onItemToggle ? () => onItemToggle(index, item) : undefined}
          {...item}
        />
      ))}
    </div>
  )
}

export { ChartLegend, ChartLegendItem }
