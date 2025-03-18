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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartLegend, ChartTooltip } from "./chart"

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
    <Card className="flex h-full min-h-80 flex-col items-center justify-between gap-4 rounded-none">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-large">
          Line Chart - Dots With Legend
        </CardTitle>
        <CardDescription>Trends in monthly revenue.</CardDescription>
      </CardHeader>
      <CardContent className="flex h-64 w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
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
              dot={{ fill: "hsl(var(--chart-1))" }}
              dataKey="Revenue"
              type="natural"
              activeDot={{
                color: "hsl(var(--chart-1))",
                r: 3,
                stroke: "currentColor",
              }}
            />

            <Legend
              verticalAlign="top"
              formatter={(value) => <ChartLegend value={value} />}
              iconType="circle"
              iconSize={8}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default LineChart02
