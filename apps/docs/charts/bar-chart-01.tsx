"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "./chart"

const chartData = [
  { date: "Jan 23", Revenue: 32000 },
  { date: "Feb 23", Revenue: 48000 },
  { date: "Mar 23", Revenue: 59000 },
  { date: "Apr 23", Revenue: 62000 },
  { date: "May 23", Revenue: 60000 },
  { date: "Jun 23", Revenue: 50000 },
  { date: "Jul 23", Revenue: 67000 },
  { date: "Aug 23", Revenue: 66000 },
  { date: "Sep 23", Revenue: 63000 },
  { date: "Oct 23", Revenue: 42000 },
  { date: "Nov 23", Revenue: 65000 },
  { date: "Dec 23", Revenue: 80000 },
]

const BarChart01 = () => {
  return (
    <Card className="flex size-full min-h-80 flex-col items-center justify-between gap-4">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-large">Bar Chart</CardTitle>
        <CardDescription>Trends in monthly revenue.</CardDescription>
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

            <Bar fill={`hsl(var(--chart-1))`} radius={4} dataKey={"Revenue"} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChart01
