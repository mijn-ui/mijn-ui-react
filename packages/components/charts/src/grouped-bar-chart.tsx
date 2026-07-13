"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
  useControlledState,
} from "@mijn-ui/react-core"
import { VariantProps, tv } from "tailwind-variants"
import { ChartLegend } from "./chart-legend"
import { ChartTooltip } from "./chart-tooltip"
import {
  ChartHue,
  DEFAULT_PALETTE,
  GroupedChartDatum,
  HUE_BG_MAP,
} from "./chart-utils"

const groupedBarChartStyles = tv({
  slots: {
    base: "flex w-full flex-col gap-3",
    legend: "",
    plot: "flex w-full items-end gap-2",
    barGroup:
      "relative flex h-full min-w-0 flex-1 items-end justify-center gap-0.5",
    bar: "rounded-t-xs relative w-full max-w-4 transition-opacity duration-200",
    valueLabel:
      "text-fg-secondary pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-medium whitespace-nowrap",
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
      true: { plot: "pt-3.5" },
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export type GroupedBarChartVariantProps = VariantProps<
  typeof groupedBarChartStyles
>
export type GroupedBarChartSlots = keyof ReturnType<
  typeof groupedBarChartStyles
>

export { groupedBarChartStyles }

/* -------------------------------------------------------------------------- */
/*                               GroupedBarChart                              */
/* -------------------------------------------------------------------------- */

export type GroupedBarChartProps =
  UnstyledComponentWithSlots<GroupedBarChartSlots> &
    React.ComponentPropsWithRef<"div"> & {
      data: GroupedChartDatum[]
      /** Series names, in the same order as each datum's `values`. */
      series: string[]
      /** Hues assigned to the series in fixed order. Defaults to `DEFAULT_PALETTE`. */
      colors?: ChartHue[]
      valueFormatter?: (value: number) => string
      size?: GroupedBarChartVariantProps["size"]
      /** Renders the formatted value above every bar. */
      showValues?: boolean
      /** Shows a per-series bubble over the hovered group (default on). */
      showTooltip?: boolean
      /** Legend items become buttons that show/hide their series. */
      toggleable?: boolean
      /** Controlled list of hidden series names (use with `toggleable`). */
      hiddenSeries?: string[]
      onHiddenSeriesChange?: (hiddenSeries: string[]) => void
      /** Controlled hovered/highlighted group index (`null` for none). */
      activeIndex?: number | null
      onActiveIndexChange?: (activeIndex: number | null) => void
      onValueClick?: (index: number) => void
    }

const GroupedBarChart = ({
  className,
  classNames,
  unstyled,
  data,
  series,
  colors = DEFAULT_PALETTE,
  valueFormatter = (value) => String(value),
  size,
  showValues = false,
  showTooltip = true,
  toggleable = false,
  hiddenSeries: hiddenSeriesProp,
  onHiddenSeriesChange,
  activeIndex: activeIndexProp,
  onActiveIndexChange,
  onValueClick,
  ref,
  ...props
}: GroupedBarChartProps) => {
  const [activeIndex, setActiveIndex] = useControlledState<number | null>(
    activeIndexProp,
    null,
    onActiveIndexChange,
  )
  const [hiddenSeries, setHiddenSeries] = useControlledState<string[]>(
    hiddenSeriesProp,
    [],
    onHiddenSeriesChange,
  )

  const { base, legend, plot, barGroup, bar, valueLabel, labelGroup, label } =
    createTVUnstyledSlots(groupedBarChartStyles({ size }), unstyled)

  const isHidden = (name: string) => hiddenSeries.includes(name)
  const toggleSeries = (name: string) =>
    setHiddenSeries(
      isHidden(name)
        ? hiddenSeries.filter((hidden) => hidden !== name)
        : [...hiddenSeries, name],
    )

  // Scale against VISIBLE values only, so hiding a dominant series
  // re-normalizes the remaining bars.
  const max = Math.max(
    ...data.flatMap((datum) =>
      datum.values.filter((_, seriesIndex) => !isHidden(series[seriesIndex] ?? "")),
    ),
    0,
  )
  const hueAt = (seriesIndex: number) =>
    colors[seriesIndex % colors.length] || "gray"

  return (
    <div
      data-slot="chart-grouped-bar"
      ref={ref}
      role="img"
      aria-label={`Grouped bar chart with ${series.length} series`}
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <ChartLegend
        unstyled={unstyled}
        items={series.map((name, seriesIndex) => ({
          label: name,
          color: hueAt(seriesIndex),
          hidden: isHidden(name),
        }))}
        onItemToggle={toggleable ? (_, item) => toggleSeries(item.label) : undefined}
        className={legend({ className: classNames?.legend })}
      />
      <div
        data-slot="chart-grouped-bar-plot"
        // Per-call variants are passed to the slot alone and extra classes
        // merged outside — the core slot wrapper drops variant args when a
        // `className` is present in the same object.
        className={cn(plot({ withValues: showValues }), classNames?.plot)}
        onMouseLeave={() => setActiveIndex(null)}
      >
        {data.map((datum, index) => (
          <div
            key={index}
            data-slot="chart-grouped-bar-group"
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
                items={datum.values.flatMap((value, seriesIndex) =>
                  isHidden(series[seriesIndex] ?? "")
                    ? []
                    : [
                        {
                          label: series[seriesIndex] ?? "",
                          value: valueFormatter(value),
                          color: hueAt(seriesIndex),
                        },
                      ],
                )}
                className="bottom-full left-1/2 mb-1 -translate-x-1/2"
              />
            )}
            {datum.values.map((value, seriesIndex) => {
              if (isHidden(series[seriesIndex] ?? "")) return null
              const height = max > 0 ? (Math.max(value, 0) / max) * 100 : 0

              return (
                <div
                  key={seriesIndex}
                  data-slot="chart-grouped-bar-fill"
                  title={
                    showTooltip
                      ? undefined
                      : `${datum.label} · ${series[seriesIndex] ?? ""}: ${valueFormatter(value)}`
                  }
                  className={cn(
                    bar({
                      dimmed: activeIndex !== null && activeIndex !== index,
                    }),
                    !unstyled && HUE_BG_MAP[hueAt(seriesIndex)],
                    classNames?.bar,
                  )}
                  style={{ height: `${height}%` }}
                >
                  {showValues && (
                    <span
                      data-slot="chart-grouped-bar-value"
                      className={valueLabel({
                        className: classNames?.valueLabel,
                      })}
                    >
                      {valueFormatter(value)}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div
        data-slot="chart-grouped-bar-label-group"
        className={labelGroup({ className: classNames?.labelGroup })}
      >
        {data.map((datum, index) => (
          <div
            key={index}
            data-slot="chart-grouped-bar-label"
            className={label({ className: classNames?.label })}
          >
            {datum.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export { GroupedBarChart }
