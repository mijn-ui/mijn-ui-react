"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartLegend, ChartTooltip } from "./chart"

const chartData = [
  { date: "Jan 23", Revenue: 50000 },
  { date: "Feb 23", Revenue: 57000 },
  { date: "Mar 23", Revenue: 48000 },
  { date: "Apr 23", Revenue: 62000 },
  { date: "May 23", Revenue: 54000 },
  { date: "Jun 23", Revenue: 68000 },
]

const LineChart02 = () => {
  return (
    <Card className="flex size-full min-h-80 flex-col items-center justify-between gap-4">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-large">
          Line Chart - Dots With Legend
        </CardTitle>
        <CardDescription>Trends in monthly revenue.</CardDescription>
      </CardHeader>
      <CardContent className="flex h-64 w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
        <ChartContainer>
          <LineChart accessibilityLayer data={chartData}>
            <YAxis
              width={36}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <XAxis dataKey="date" tickLine={false} axisLine={false} />

            <Tooltip content={<ChartTooltip active />} />

            <CartesianGrid horizontal={false} strokeDasharray={3} />

            <Line
              stroke="hsl(var(--chart-1))"
              dot={{ fill: "hsl(var(--chart-1))" }}
              dataKey="Revenue"
              type="natural"
              activeDot={{
                r: 5,
              }}
            />

            <Legend
              verticalAlign="top"
              formatter={(value) => <ChartLegend value={value} />}
              iconType="circle"
              iconSize={8}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LineChart02
