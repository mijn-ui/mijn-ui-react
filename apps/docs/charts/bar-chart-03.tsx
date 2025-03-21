"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartLegend, ChartTooltip } from "./chart"

const chartData = [
  { date: "Jan 23", Revenue: 50000, Expenses: 32000 },
  { date: "Feb 23", Revenue: 57000, Expenses: 29000 },
  { date: "Mar 23", Revenue: 48000, Expenses: 37000 },
  { date: "Apr 23", Revenue: 62000, Expenses: 35000 },
  { date: "May 23", Revenue: 54000, Expenses: 40000 },
  { date: "Jun 23", Revenue: 68000, Expenses: 42000 },
  { date: "Jul 23", Revenue: 59000, Expenses: 45000 },
  { date: "Aug 23", Revenue: 71000, Expenses: 42000 },
  { date: "Sep 23", Revenue: 56000, Expenses: 39000 },
  { date: "Oct 23", Revenue: 63000, Expenses: 31000 },
  { date: "Nov 23", Revenue: 49000, Expenses: 43000 },
  { date: "Dec 23", Revenue: 72000, Expenses: 47000 },
]

const BarChart03 = () => {
  return (
    <Card className="flex size-full min-h-80 flex-col items-center justify-between gap-4">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-large">
          Bar Chart - Stacked With Legend
        </CardTitle>
        <CardDescription>
          Trends in monthly revenue and expenses.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-64 w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
        <ChartContainer>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray={3} />

            <XAxis
              tickMargin={10}
              axisLine={false}
              dataKey={"date"}
              tickLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ transform: "translate(-3, 0)" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip content={<ChartTooltip active />} />

            <Bar stackId="a" fill={`hsl(var(--chart-1))`} dataKey={"Revenue"} />
            <Bar
              stackId="a"
              fill={`hsl(var(--chart-2))`}
              radius={[4, 4, 0, 0]}
              dataKey={"Expenses"}
            />

            <Legend
              verticalAlign="top"
              formatter={(value) => <ChartLegend value={value} />}
              iconType="circle"
              iconSize={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChart03
