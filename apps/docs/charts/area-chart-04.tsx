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
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartLegend, ChartTooltip } from "./chart"

const chartData = [
  { date: "Jan 23", Revenue: 50000, Expenses: 32000 },
  { date: "Feb 23", Revenue: 57000, Expenses: 29000 },
  { date: "Mar 23", Revenue: 48000, Expenses: 37000 },
  { date: "Apr 23", Revenue: 62000, Expenses: 35000 },
  { date: "May 23", Revenue: 54000, Expenses: 40000 },
  { date: "Jun 23", Revenue: 68000, Expenses: 42000 },
  // { date: "Jul 23", Revenue: 59000, Expenses: 45000 },
  // { date: "Aug 23", Revenue: 71000, Expenses: 42000 },
  // { date: "Sep 23", Revenue: 56000, Expenses: 39000 },
  // { date: "Oct 23", Revenue: 63000, Expenses: 31000 },
  // { date: "Nov 23", Revenue: 49000, Expenses: 43000 },
  // { date: "Dec 23", Revenue: 72000, Expenses: 47000 },
]

const AreaChart04 = () => {
  return (
    <Card className="rounded-none">
      <CardHeader className="space-y-0">
        <CardTitle className="text-large">
          Area Chart - Stacked With Legend
        </CardTitle>
        <CardDescription>
          Trends in monthly revenue and expenses.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex aspect-[543/300] w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
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
              content={<ChartTooltip />}
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
              dataKey="Revenue"
              type={"natural"}
              activeDot={{
                color: "hsl(var(--chart-1))",
                r: 3,
                stroke: "white",
              }}
            />

            <Area
              fill="hsl(var(--chart-2))"
              stroke="hsl(var(--chart-2))"
              fillOpacity={0.1}
              dataKey="Expenses"
              type={"natural"}
              activeDot={{
                color: "hsl(var(--chart-2))",
                r: 3,
                stroke: "white",
              }}
            />

            <Legend
              verticalAlign="top"
              formatter={(value) => <ChartLegend value={value} />}
              iconType="circle"
              iconSize={8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default AreaChart04
