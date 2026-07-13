import type { Meta, StoryObj } from "@storybook/react"
import { BarChart, BarChartProps } from "./bar-chart"
import { DonutChart } from "./donut-chart"
import { GroupedBarChart } from "./grouped-bar-chart"
import { Sparkline as SparklineChart } from "./sparkline"

const meta: Meta<typeof BarChart> = {
  title: "Components/Charts",
  component: BarChart,
  parameters: {
    layout: "centered",
  },
  args: {
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof BarChart>

const revenueData = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 3800 },
  { label: "Mar", value: 5100 },
  { label: "Apr", value: 4600 },
  { label: "May", value: 5900 },
  { label: "Jun", value: 5400 },
  { label: "Jul", value: 6800 },
]

const BarChartTemplate = (args: BarChartProps) => (
  <div className="w-96">
    <BarChart
      color="blue"
      valueFormatter={(value) => `$${value.toLocaleString()}`}
      {...args}
      data={revenueData}
    />
  </div>
)

export const Default: Story = {
  render: (args: BarChartProps) => <BarChartTemplate {...args} />,
}

export const Grouped: Story = {
  render: (args: BarChartProps) => (
    <div className="w-96">
      <GroupedBarChart
        unstyled={args.unstyled}
        series={["Online", "In-store"]}
        data={[
          { label: "Q1", values: [1200, 900] },
          { label: "Q2", values: [1500, 1100] },
          { label: "Q3", values: [1400, 1300] },
          { label: "Q4", values: [1900, 1500] },
        ]}
        valueFormatter={(value) => `$${value.toLocaleString()}`}
      />
    </div>
  ),
}

export const Donut: Story = {
  render: (args: BarChartProps) => (
    <DonutChart
      unstyled={args.unstyled}
      data={[
        { label: "Cash", value: 45, color: "blue" },
        { label: "Card", value: 30, color: "emerald" },
        { label: "Mobile", value: 15, color: "amber" },
        { label: "Other", value: 10, color: "gray" },
      ]}
      valueFormatter={(value) => `${value}%`}
    />
  ),
}

export const WithValues: Story = {
  render: (args: BarChartProps) => (
    <div className="flex w-[420px] flex-col gap-8">
      <BarChart
        unstyled={args.unstyled}
        color="blue"
        showValues
        valueFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
        data={revenueData}
      />
      <GroupedBarChart
        unstyled={args.unstyled}
        series={["Online", "In-store"]}
        showValues
        data={[
          { label: "Q1", values: [1200, 900] },
          { label: "Q2", values: [1500, 1100] },
          { label: "Q3", values: [1400, 1300] },
          { label: "Q4", values: [1900, 1500] },
        ]}
        valueFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
      />
    </div>
  ),
}

export const ToggleableSeries: Story = {
  render: (args: BarChartProps) => (
    <div className="w-96">
      <GroupedBarChart
        unstyled={args.unstyled}
        toggleable
        series={["Online", "In-store", "Wholesale"]}
        data={[
          { label: "Q1", values: [1200, 900, 700] },
          { label: "Q2", values: [1500, 1100, 850] },
          { label: "Q3", values: [1400, 1300, 600] },
          { label: "Q4", values: [1900, 1500, 950] },
        ]}
        valueFormatter={(value) => `$${value.toLocaleString()}`}
      />
    </div>
  ),
}

export const DonutWithPercentages: Story = {
  render: (args: BarChartProps) => (
    <DonutChart
      unstyled={args.unstyled}
      size="lg"
      thickness="thick"
      showPercentages
      data={[
        { label: "Cash", value: 45, color: "blue" },
        { label: "Card", value: 30, color: "emerald" },
        { label: "Mobile", value: 15, color: "amber" },
        { label: "Other", value: 10, color: "gray" },
      ]}
      valueFormatter={(value) => `${value}%`}
    />
  ),
}

export const ColorVariations: Story = {
  render: (args: BarChartProps) => (
    <div className="flex w-[420px] flex-col gap-8">
      {/* Palette cycled per bar */}
      <BarChart
        unstyled={args.unstyled}
        colors={["blue", "emerald", "amber", "violet", "rose", "cyan", "orange"]}
        valueFormatter={(value) => `$${value.toLocaleString()}`}
        data={revenueData}
      />
      {/* Per-datum colors (datum.color wins over the palette) */}
      <BarChart
        unstyled={args.unstyled}
        size="sm"
        valueFormatter={(value) => `${value} units`}
        data={[
          { label: "Espresso", value: 320, color: "teal" },
          { label: "Latte", value: 480, color: "indigo" },
          { label: "Mocha", value: 260, color: "pink" },
          { label: "Tea", value: 190, color: "lime" },
        ]}
      />
      <div className="flex items-center gap-6">
        <SparklineChart unstyled={args.unstyled} color="fuchsia" data={[4, 6, 5, 8, 7, 10]} />
        <SparklineChart unstyled={args.unstyled} color="teal" showArea data={[10, 7, 8, 5, 6, 3]} />
        <SparklineChart unstyled={args.unstyled} color="orange" data={[2, 5, 4, 7, 6, 9]} />
      </div>
    </div>
  ),
}

export const Sparkline: Story = {
  render: (args: BarChartProps) => (
    <div className="flex items-center gap-4">
      <SparklineChart
        unstyled={args.unstyled}
        data={[4, 6, 5, 8, 7, 10, 9, 12]}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Today"]}
        valueFormatter={(value) => `${value}k`}
      />
      <SparklineChart
        unstyled={args.unstyled}
        color="emerald"
        showArea
        data={[12, 9, 11, 8, 10, 6, 7, 4]}
        labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Today"]}
        valueFormatter={(value) => `${value}k`}
      />
    </div>
  ),
}

export const Unstyled: Story = {
  render: (args: BarChartProps) => <BarChartTemplate {...args} />,
  args: {
    unstyled: true,
  },
}
