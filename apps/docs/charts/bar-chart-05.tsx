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
  Cell,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip } from "./chart"

const chartData = [
  { date: "Jan 23", Revenue: 50000 },
  { date: "Feb 23", Revenue: -10000 },
  { date: "Mar 23", Revenue: 48000 },
  { date: "Apr 23", Revenue: -22000 },
  { date: "May 23", Revenue: -34000 },
  { date: "Jun 23", Revenue: 68000 },
  { date: "Jul 23", Revenue: 59000 },
  { date: "Aug 23", Revenue: -21000 },
  { date: "Sep 23", Revenue: 56000 },
  { date: "Oct 23", Revenue: 63000 },
  { date: "Nov 23", Revenue: -40000 },
  { date: "Dec 23", Revenue: 72000 },
]

const BarChart05 = () => {
  return (
    <Card className="flex h-full min-h-80 flex-col items-center justify-between gap-4 rounded-none">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-large">Bar Chart - Minus</CardTitle>
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

            <Tooltip content={<ChartTooltip active hideIndicator />} />

            <Bar dataKey={"Revenue"}>
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.Revenue}
                  fill={
                    item.Revenue > 0
                      ? "hsl(var(--chart-1))"
                      : "hsl(var(--chart-5))"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default BarChart05
