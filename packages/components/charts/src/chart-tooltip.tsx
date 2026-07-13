"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"
import { ChartHue, HUE_BG_MAP } from "./chart-utils"

const chartTooltipStyles = tv({
  slots: {
    base: "bg-bg-default border-outline-secondary pointer-events-none absolute z-10 rounded-md border px-2 py-1 text-xs whitespace-nowrap shadow-md",
    title: "text-fg-secondary font-medium",
    row: "flex items-center gap-1.5",
    swatch: "rounded-2xs size-2 shrink-0",
    label: "text-fg-secondary",
    value: "text-fg-default ml-auto pl-2 font-medium",
  },
})

export type ChartTooltipVariantProps = VariantProps<typeof chartTooltipStyles>
export type ChartTooltipSlots = keyof ReturnType<typeof chartTooltipStyles>

export { chartTooltipStyles }

/* -------------------------------------------------------------------------- */
/*                                ChartTooltip                                */
/* -------------------------------------------------------------------------- */

export type ChartTooltipItem = {
  value: string
  label?: string
  color?: ChartHue
}

export type ChartTooltipProps = UnstyledComponentWithSlots<ChartTooltipSlots> &
  React.ComponentPropsWithRef<"div"> & {
    /** Heading line (usually the hovered datum's label). */
    heading?: string
    /** One row per value; rows with a `color` render a hue swatch. */
    items?: ChartTooltipItem[]
  }

/**
 * The floating hover bubble shared by every chart. Purely presentational —
 * charts own the hover state and position it via `style`.
 */
const ChartTooltip = ({
  className,
  classNames,
  unstyled,
  heading,
  items,
  children,
  ref,
  ...props
}: ChartTooltipProps) => {
  const { base, title, row, swatch, label, value } = createTVUnstyledSlots(
    chartTooltipStyles(),
    unstyled,
  )

  return (
    <div
      data-slot="chart-tooltip"
      ref={ref}
      role="presentation"
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      {heading !== undefined && (
        <div
          data-slot="chart-tooltip-title"
          className={title({ className: classNames?.title })}
        >
          {heading}
        </div>
      )}
      {items?.map((item, index) => (
        <div
          key={index}
          data-slot="chart-tooltip-row"
          className={row({ className: classNames?.row })}
        >
          {item.color && (
            <span
              data-slot="chart-tooltip-swatch"
              aria-hidden
              className={swatch({
                className: cn(
                  !unstyled && HUE_BG_MAP[item.color],
                  classNames?.swatch,
                ),
              })}
            />
          )}
          {item.label !== undefined && (
            <span
              data-slot="chart-tooltip-label"
              className={label({ className: classNames?.label })}
            >
              {item.label}
            </span>
          )}
          <span
            data-slot="chart-tooltip-value"
            className={value({ className: classNames?.value })}
          >
            {item.value}
          </span>
        </div>
      ))}
      {children}
    </div>
  )
}

export { ChartTooltip }
