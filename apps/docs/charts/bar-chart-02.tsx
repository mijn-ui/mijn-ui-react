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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartTooltip } from "./chart"

const chartData = [
  { date: "Jan 23", Revenue: 32000 },
  { date: "Feb 23", Revenue: 48000 },
  { date: "Mar 23", Revenue: 80000 },
  { date: "Apr 23", Revenue: 62000 },
  { date: "May 23", Revenue: 60000 },
  { date: "Jun 23", Revenue: 50000 },
]

const BarChart02 = () => {
  return (
    <Card className="rounded-none">
      <CardHeader className="space-y-0">
        <CardTitle className="text-large">Bar Chart - Horizontal</CardTitle>
        <CardDescription>Trends in monthly revenue.</CardDescription>
      </CardHeader>
      <CardContent className="flex aspect-[543/300] w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <CartesianGrid
              horizontal={false}
              stroke="hsl(var(--mijnui-border))"
              strokeDasharray={3}
            />

            <XAxis
              type="number"
              dataKey="Revenue"
              tickMargin={10}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <YAxis
              dataKey="date"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "hsl(var(--mijnui-accent))" }}
              content={<ChartTooltip active />}
            />
            <Bar dataKey="Revenue" fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default BarChart02
