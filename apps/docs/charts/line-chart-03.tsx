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
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartTooltip } from "./chart"

const chartData = [
  { date: "Jan 23", Revenue: 50000 },
  { date: "Feb 23", Revenue: 57000 },
  { date: "Mar 23", Revenue: 48000 },
  { date: "Apr 23", Revenue: 62000 },
  { date: "May 23", Revenue: 54000 },
  { date: "Jun 23", Revenue: 68000 },
]

const LineChart03 = () => {
  return (
    <Card className="rounded-none">
      <CardHeader className="space-y-0">
        <CardTitle className="text-large">Line Chart - Step</CardTitle>
        <CardDescription>Trends in monthly revenue.</CardDescription>
      </CardHeader>
      <CardContent className="flex aspect-[543/300] w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart accessibilityLayer data={chartData}>
            <YAxis
              className="text-muted-foreground"
              width={36}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <XAxis
              className="text-muted-foreground"
              dataKey="date"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              cursor={{ stroke: "hsl(var(--mijnui-border))", strokeWidth: 1 }}
              content={<ChartTooltip active />}
            />

            <CartesianGrid
              horizontal={false}
              stroke="hsl(var(--mijnui-border))"
              strokeDasharray={3}
            />

            <Line
              stroke="hsl(var(--chart-1))"
              dot={false}
              type={"step"}
              dataKey="Revenue"
              activeDot={{
                color: "hsl(var(--chart-1))",
                r: 3,
                stroke: "currentColor",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default LineChart03
