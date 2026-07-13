"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
  useControlledState,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"
import { ChartTooltip } from "./chart-tooltip"
import {
  ChartDatum,
  ChartHue,
  HUE_BG_MAP,
  HUE_BG_SUBTLE_MAP,
} from "./chart-utils"

const barChartStyles = tv({
  slots: {
    base: "flex w-full flex-col gap-2",
    plot: "flex w-full items-end gap-2",
    barGroup: "relative flex h-full min-w-0 flex-1 items-end justify-center",
    bar: "rounded-t-xs relative w-full max-w-10 transition-opacity duration-200",
    valueLabel:
      "text-fg-secondary pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap",
    labelGroup: "flex w-full gap-2",
    label: "text-fg-tertiary min-w-0 flex-1 truncate text-center text-xs",
  },
  variants: {
    size: {
      sm: { plot: "h-[140px]" },
      default: { plot: "h-[200px]" },
      lg: { plot: "h-[260px]" },
    },
    dimmed: {
      true: { bar: "opacity-40" },
    },
    clickable: {
      true: { barGroup: "cursor-pointer" },
    },
    // Headroom so labels above full-height bars stay inside the plot.
    withValues: {
      true: { plot: "pt-4" },
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export type BarChartVariantProps = VariantProps<typeof barChartStyles>
export type BarChartSlots = keyof ReturnType<typeof barChartStyles>

export { barChartStyles }

/* -------------------------------------------------------------------------- */
/*                                  BarChart                                  */
/* -------------------------------------------------------------------------- */

export type BarChartProps = UnstyledComponentWithSlots<BarChartSlots> &
  React.ComponentPropsWithRef<"div"> & {
    data: ChartDatum[]
    valueFormatter?: (value: number) => string
    /** Renders every bar but the last with the subtle hue, spotlighting the most recent value. */
    emphasizeLast?: boolean
    /** Single hue for all bars (lowest precedence). */
    color?: ChartHue
    /** Palette cycled per bar; each datum's own `color` wins over it. */
    colors?: ChartHue[]
    size?: BarChartVariantProps["size"]
    /** Renders the formatted value above every bar. */
    showValues?: boolean
    /** Shows a styled label+value bubble over the hovered bar (default on). */
    showTooltip?: boolean
    /** Controlled hovered/highlighted bar index (`null` for none). */
    activeIndex?: number | null
    onActiveIndexChange?: (activeIndex: number | null) => void
    onValueClick?: (index: number) => void
  }

const BarChart = ({
  className,
  classNames,
  unstyled,
  data,
  valueFormatter = (value) => String(value),
  emphasizeLast = false,
  color = "brand",
  colors,
  size,
  showValues = false,
  showTooltip = true,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
  onValueClick,
  ref,
  ...props
}: BarChartProps) => {
  const [activeIndex, setActiveIndex] = useControlledState<number | null>(
    activeIndexProp,
    null,
    onActiveIndexChange,
  )

  const { base, plot, barGroup, bar, valueLabel, labelGroup, label } =
    createTVUnstyledSlots(barChartStyles({ size }), unstyled)

  const max = Math.max(...data.map((datum) => datum.value), 0)

  /** Per-bar hue: the datum's own color > the cycled palette > `color`. */
  const hueAt = (index: number) =>
    data[index]?.color ??
    (colors && colors.length > 0 ? colors[index % colors.length] : color)

  return (
    <div
      data-slot="chart-bar"
      ref={ref}
      role="img"
      aria-label={`Bar chart with ${data.length} bars`}
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <div
        data-slot="chart-bar-plot"
        // Per-call variants are passed to the slot alone and extra classes
        // merged outside — the core slot wrapper drops variant args when a
        // `className` is present in the same object.
        className={cn(plot({ withValues: showValues }), classNames?.plot)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {data.map((datum, index) => {
          const height = max > 0 ? (Math.max(datum.value, 0) / max) * 100 : 0
          const subtle = emphasizeLast && index !== data.length - 1

          return (
            <div
              key={index}
              data-slot="chart-bar-group"
              title={
                showTooltip
                  ? undefined
                  : `${datum.label}: ${valueFormatter(datum.value)}`
              }
              // Per-call variants are passed to the slot alone and extra
              // classes merged outside — the core slot wrapper drops variant
              // args when a `className` is present in the same object.
              className={cn(
                barGroup({ clickable: !!onValueClick }),
                classNames?.barGroup,
              )}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={onValueClick ? () => onValueClick(index) : undefined}
            >
              {showTooltip && activeIndex === index && (
                <ChartTooltip
                  unstyled={unstyled}
                  heading={datum.label}
                  items={[{ value: valueFormatter(datum.value), color: hueAt(index) }]}
                  className="bottom-full left-1/2 mb-1 -translate-x-1/2"
                />
              )}
              <div
                data-slot="chart-bar-fill"
                className={cn(
                  bar({
                    dimmed: activeIndex !== null && activeIndex !== index,
                  }),
                  !unstyled &&
                    (subtle
                      ? HUE_BG_SUBTLE_MAP[hueAt(index)]
                      : HUE_BG_MAP[hueAt(index)]),
                  classNames?.bar,
                )}
                style={{ height: `${height}%` }}
              >
                {showValues && (
                  <span
                    data-slot="chart-bar-value"
                    className={valueLabel({
                      className: classNames?.valueLabel,
                    })}
                  >
                    {valueFormatter(datum.value)}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <div
        data-slot="chart-bar-label-group"
        className={labelGroup({ className: classNames?.labelGroup })}
      >
        {data.map((datum, index) => (
          <div
            key={index}
            data-slot="chart-bar-label"
            className={label({ className: classNames?.label })}
          >
            {datum.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export { BarChart }
