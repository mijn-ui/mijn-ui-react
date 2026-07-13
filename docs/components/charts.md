# Charts

[← Components](./README.md) · Code: [`@mijn-ui/react-charts`](../../packages/components/charts)

Lightweight, token-driven data visualizations — bar, grouped bar, donut, and
sparkline charts plus a shared legend. Hand-rolled with flex divs and SVG (no
charting-library dependency).

_Screenshot pending._

## Anatomy (code)

```tsx
import {
  BarChart,
  ChartLegend,
  DonutChart,
  GroupedBarChart,
  Sparkline,
} from "@mijn-ui/react-charts"

<BarChart
  color="blue"
  data={[
    { label: "Jan", value: 4200 },
    { label: "Feb", value: 3800 },
  ]}
  valueFormatter={(value) => `$${value.toLocaleString()}`}
/>

<GroupedBarChart
  series={["Online", "In-store"]}
  data={[{ label: "Q1", values: [1200, 900] }]}
/>

<DonutChart
  data={[
    { label: "Cash", value: 45, color: "blue" },
    { label: "Card", value: 55, color: "emerald" },
  ]}
/>

<Sparkline data={[4, 6, 5, 8, 7, 10]} color="emerald" showArea />

<ChartLegend
  orientation="horizontal"
  items={[{ label: "Online", color: "blue", value: "$6,000" }]}
/>
```

## Variants

| Component                      | Property      | Values                                                    |
| ------------------------------ | ------------- | --------------------------------------------------------- |
| `BarChart` / `GroupedBarChart` | `size`        | `sm` (140px), `default` (200px), `lg` (260px) plot height |
| `DonutChart`                   | `size`        | `sm` (120px), `default` (148px), `lg` (180px)             |
| `DonutChart`                   | `thickness`   | `thin`, `default`, `thick`                                |
| `ChartLegend`                  | `orientation` | `horizontal`, `vertical`                                  |

Bar charts also support `emphasizeLast` (all bars but the last drop to the
subtle hue), controlled or uncontrolled hover highlighting
(`activeIndex` / `onActiveIndexChange` — non-active bars dim),
`onValueClick`, and `showValues` (renders the formatted value above every
bar). `BarChart` colors resolve per bar: each datum's own `color` >
the `colors` palette (cycled by index) > the single `color` prop. `GroupedBarChart` adds series show/hide: set `toggleable` to make
legend items toggle buttons (keyboard-operable, hidden series dim with a
strikethrough and the chart re-scales to the visible values), controllable
via `hiddenSeries` / `onHiddenSeriesChange`. `DonutChart` supports
`showPercentages` — each slice's percentage is drawn on the ring in the
hue's `on-bg` color (slices under 6% stay label-free; exact values remain
in the slice tooltips). `Sparkline` takes `width` / `height` (defaults
120×32) and `showArea` for a `currentColor` gradient fill.

Exposed types: `BarChartProps`, `GroupedBarChartProps`, `DonutChartProps`,
`SparklineProps`, `ChartLegendProps`, `ChartLegendItemProps`, plus the
per-component `*VariantProps` / `*Slots` types and the shared `ChartHue`,
`ChartDatum`, `GroupedChartDatum`, `DonutChartDatum`, `ChartLegendItemData`,
`DEFAULT_PALETTE`, and hue class maps (`HUE_BG_MAP`, `HUE_BG_SUBTLE_MAP`,
`HUE_STROKE_MAP`, `HUE_TEXT_MAP`, `HUE_ON_BG_FILL_MAP`).

- **Color** comes from the categorical hue roles in
  [Colors](../foundation/colors.md) — `bg/<hue>` (+ `-subtle`) for bar fills
  and legend swatches, `fg/<hue>` for donut slices and sparkline strokes — so
  every chart adapts to light/dark mode automatically. `color` accepts any of
  the 18 documented hues or `brand`; multi-series components assign hues from
  `DEFAULT_PALETTE` in fixed order.
- Labels and legend text use neutral `fg/secondary` / `fg/tertiary` tokens,
  never the series color.
- Values surface through native `title` tooltips; roots carry `role="img"`
  with a generated `aria-label`.
