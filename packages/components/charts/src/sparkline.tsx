"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"
import { ChartTooltip } from "./chart-tooltip"
import { ChartHue, HUE_TEXT_MAP } from "./chart-utils"

const sparklineStyles = tv({
  slots: {
    wrapper: "relative inline-flex shrink-0",
    base: "shrink-0",
    line: "stroke-2",
    area: "stroke-none",
    marker: "fill-current stroke-none",
  },
})

export type SparklineVariantProps = VariantProps<typeof sparklineStyles>
export type SparklineSlots = keyof ReturnType<typeof sparklineStyles>

export { sparklineStyles }

/* -------------------------------------------------------------------------- */
/*                                  Sparkline                                 */
/* -------------------------------------------------------------------------- */

/** Inset so the line's stroke isn't clipped at the SVG edges. */
const PADDING = 2

export type SparklineProps = UnstyledComponentWithSlots<SparklineSlots> &
  Omit<React.ComponentPropsWithRef<"svg">, "color" | "width" | "height"> & {
    data: number[]
    /** Hue applied as a `text-fg-<hue>` class; the line strokes `currentColor`. */
    color?: ChartHue
    /** Fills the area under the line with a `currentColor` gradient. */
    showArea?: boolean
    /** Point labels for the hover bubble (falls back to `#<index>`). */
    labels?: string[]
    valueFormatter?: (value: number) => string
    /** Shows a marker + label/value bubble at the nearest point (default on). */
    showTooltip?: boolean
    width?: number
    height?: number
  }

const Sparkline = ({
  className,
  classNames,
  unstyled,
  data,
  color = "brand",
  showArea = false,
  labels,
  valueFormatter = (value) => String(value),
  showTooltip = true,
  width = 120,
  height = 32,
  ref,
  ...props
}: SparklineProps) => {
  const gradientId = React.useId()
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  const { wrapper, base, line, area, marker } = createTVUnstyledSlots(
    sparklineStyles(),
    unstyled,
  )

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min

  const coords = data.map((value, index) => {
    const x =
      data.length > 1
        ? PADDING + (index / (data.length - 1)) * (width - PADDING * 2)
        : width / 2
    const y =
      range > 0
        ? height - PADDING - ((value - min) / range) * (height - PADDING * 2)
        : height / 2

    return { x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 }
  })

  const linePath = coords
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ")
  const areaPath =
    coords.length > 0
      ? `${linePath} L${width - PADDING},${height} L${PADDING},${height} Z`
      : ""

  /** Nearest data index for a cursor position (svg renders 1:1 with px). */
  const indexAt = (event: React.MouseEvent<SVGSVGElement>) => {
    if (data.length === 0) return null
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const ratio = (x - PADDING) / Math.max(width - PADDING * 2, 1)
    return Math.min(
      data.length - 1,
      Math.max(0, Math.round(ratio * (data.length - 1))),
    )
  }

  const hovered =
    showTooltip && hoveredIndex !== null && coords[hoveredIndex]
      ? { index: hoveredIndex, ...coords[hoveredIndex] }
      : null

  return (
    <span
      data-slot="chart-sparkline-wrapper"
      className={wrapper({ className: classNames?.wrapper })}
    >
      <svg
      data-slot="chart-sparkline"
      ref={ref}
      role="img"
      aria-label={`Sparkline with ${data.length} points`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      onMouseMove={showTooltip ? (event) => setHoveredIndex(indexAt(event)) : undefined}
      onMouseLeave={showTooltip ? () => setHoveredIndex(null) : undefined}
      className={base({
        className: cn(
          !unstyled && HUE_TEXT_MAP[color],
          classNames?.base,
          className,
        ),
      })}
      {...props}
    >
      {showArea && coords.length > 0 && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path
            data-slot="chart-sparkline-area"
            d={areaPath}
            fill={`url(#${gradientId})`}
            className={area({ className: classNames?.area })}
          />
        </>
      )}
      {coords.length > 0 && (
        <path
          data-slot="chart-sparkline-line"
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={line({ className: classNames?.line })}
        />
      )}
      {hovered && (
        <circle
          data-slot="chart-sparkline-marker"
          cx={hovered.x}
          cy={hovered.y}
          r={2.5}
          className={marker({ className: classNames?.marker })}
        />
      )}
      </svg>
      {hovered && (
        <ChartTooltip
          unstyled={unstyled}
          heading={labels?.[hovered.index] ?? `#${hovered.index + 1}`}
          items={[{ value: valueFormatter(data[hovered.index] ?? 0), color }]}
          className="-translate-x-1/2 -translate-y-[130%]"
          style={{ left: hovered.x, top: hovered.y }}
        />
      )}
    </span>
  )
}

export { Sparkline }
