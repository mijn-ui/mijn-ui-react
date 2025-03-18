"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react"
import {
  Area,
  AreaChart,
  CartesianGrid,
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

const AreaChart03 = () => {
  return (
    <Card className="flex h-full min-h-80 flex-col items-center justify-between gap-4 rounded-none">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-large">Area Chart - Step</CardTitle>
        <CardDescription>Trends in monthly revenue.</CardDescription>
      </CardHeader>
      <CardContent className="flex h-64 w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <YAxis
              className="text-muted-foreground"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{ transform: "translate(-3, 0)" }}
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
              content={<ChartTooltip hideLabel />}
            />

            <CartesianGrid
              horizontal={false}
              stroke="hsl(var(--mijnui-border))"
              strokeDasharray={3}
            />

            <Area
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--chart-1))"
              fillOpacity={0.1}
              type="step"
              dataKey="Revenue"
              activeDot={{
                color: "hsl(var(--chart-1))",
                r: 3,
                stroke: "white",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AreaChart03
