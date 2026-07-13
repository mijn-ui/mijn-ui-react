"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"
import { ChartTooltip } from "./chart-tooltip"
import {
  DEFAULT_PALETTE,
  DonutChartDatum,
  HUE_ON_BG_FILL_MAP,
  HUE_STROKE_MAP,
} from "./chart-utils"

const donutChartStyles = tv({
  slots: {
    base: "relative inline-flex items-center justify-center",
    svg: "-rotate-90",
    slice: "fill-none transition-opacity duration-200",
    sliceLabel: "pointer-events-none select-none text-[2.6px] font-semibold",
  },
  variants: {
    size: {
      sm: { svg: "size-[120px]" },
      default: { svg: "size-[148px]" },
      lg: { svg: "size-[180px]" },
    },
    thickness: {
      thin: { slice: "[stroke-width:3]" },
      default: { slice: "[stroke-width:5]" },
      thick: { slice: "[stroke-width:8]" },
    },
  },
  defaultVariants: {
    size: "default",
    thickness: "default",
  },
})

export type DonutChartVariantProps = VariantProps<typeof donutChartStyles>
export type DonutChartSlots = keyof ReturnType<typeof donutChartStyles>

export { donutChartStyles }

/* -------------------------------------------------------------------------- */
/*                                 DonutChart                                 */
/* -------------------------------------------------------------------------- */

/*
 * Slices are drawn with the stroke-dasharray ring technique: a fixed 40×40
 * viewBox with a circle radius chosen so the circumference is exactly 100
 * units — dash lengths can then be expressed directly as percentages.
 */
const RADIUS = 100 / (2 * Math.PI)
const CENTER = 20
/** Gap between slices, in circumference units (≈2px at the default size). */
const SLICE_GAP = 0.5

/** Slices narrower than this get no percentage label (unreadable). */
const MIN_LABELED_PERCENT = 6

export type DonutChartProps = UnstyledComponentWithSlots<DonutChartSlots> &
  React.ComponentPropsWithRef<"div"> & {
    data: DonutChartDatum[]
    valueFormatter?: (value: number) => string
    size?: DonutChartVariantProps["size"]
    thickness?: DonutChartVariantProps["thickness"]
    /** Draws each slice's percentage on the ring (slices ≥ 6% only). */
    showPercentages?: boolean
    /** Shows a label+value bubble at the hovered slice (default on). */
    showTooltip?: boolean
  }

const DonutChart = ({
  className,
  classNames,
  unstyled,
  data,
  valueFormatter = (value) => String(value),
  size,
  thickness,
  showPercentages = false,
  showTooltip = true,
  ref,
  ...props
}: DonutChartProps) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const { base, svg, slice, sliceLabel } = createTVUnstyledSlots(
    donutChartStyles({ size, thickness }),
    unstyled,
  )

  const total = data.reduce((sum, datum) => sum + Math.max(datum.value, 0), 0)
  const gap = data.length > 1 ? SLICE_GAP : 0

  let offset = 0
  let tooltip: React.ReactNode = null

  return (
    <div
      data-slot="chart-donut"
      ref={ref}
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <svg
        data-slot="chart-donut-svg"
        role="img"
        aria-label={`Donut chart with ${data.length} slices`}
        viewBox="0 0 40 40"
        className={svg({ className: classNames?.svg })}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {data.map((datum, index) => {
          const percent =
            total > 0 ? (Math.max(datum.value, 0) / total) * 100 : 0
          const length = Math.max(percent - gap, 0)
          const startOffset = offset
          const hue =
            datum.color ?? DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]

          // Slice midpoint in the SVG's (pre-CSS-rotation) coordinates.
          const midAngle = ((startOffset + percent / 2) / 100) * 2 * Math.PI
          const labelX = CENTER + RADIUS * Math.cos(midAngle)
          const labelY = CENTER + RADIUS * Math.sin(midAngle)

          offset += percent

          if (showTooltip && activeIndex === index) {
            // Midpoint AFTER the svg's -90° rotation, as a % of the wrapper —
            // anchors the bubble to the slice the cursor is on.
            const visualX = CENTER + RADIUS * Math.cos(midAngle - Math.PI / 2)
            const visualY = CENTER + RADIUS * Math.sin(midAngle - Math.PI / 2)
            tooltip = (
              <ChartTooltip
                unstyled={unstyled}
                heading={datum.label}
                items={[
                  {
                    value: `${valueFormatter(datum.value)} · ${Math.round(percent)}%`,
                    color: hue,
                  },
                ]}
                className="-translate-x-1/2 -translate-y-[130%]"
                style={{
                  left: `${(visualX / 40) * 100}%`,
                  top: `${(visualY / 40) * 100}%`,
                }}
              />
            )
          }

          return (
            <React.Fragment key={index}>
              <circle
                data-slot="chart-donut-slice"
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                strokeDasharray={`${length} ${100 - length}`}
                strokeDashoffset={-(startOffset + gap / 2)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  slice({
                    className: cn(
                      !unstyled && HUE_STROKE_MAP[hue],
                      classNames?.slice,
                    ),
                  }),
                  activeIndex !== null && activeIndex !== index && "opacity-40",
                )}
              >
                <title>
                  {`${datum.label}: ${valueFormatter(datum.value)} (${Math.round(percent)}%)`}
                </title>
              </circle>
              {showPercentages && percent >= MIN_LABELED_PERCENT && (
                <text
                  data-slot="chart-donut-slice-label"
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  // Counter-rotate around the label point so the text reads
                  // upright despite the svg's -90° ring rotation.
                  transform={`rotate(90 ${labelX} ${labelY})`}
                  className={sliceLabel({
                    className: cn(
                      !unstyled && HUE_ON_BG_FILL_MAP[hue],
                      classNames?.sliceLabel,
                    ),
                  })}
                  aria-hidden
                >
                  {`${Math.round(percent)}%`}
                </text>
              )}
            </React.Fragment>
          )
        })}
      </svg>
      {tooltip}
    </div>
  )
}

export { DonutChart }
