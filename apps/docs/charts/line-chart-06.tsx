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

const LineChart06 = () => {
  return (
    <Card className="flex h-full min-h-80 flex-col items-center justify-between gap-4 rounded-none">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-large">
          Line Chart - Custom Pattern
        </CardTitle>
        <CardDescription>
          Trends in monthly revenue and expenses.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-64 w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
        <ChartContainer>
          <LineChart accessibilityLayer data={chartData}>
            <YAxis
              width={42}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <XAxis dataKey="date" tickLine={false} axisLine={false} />

            <Tooltip
              content={<ChartTooltip active />}
              position={{ y: 0 }}
              offset={20}
            />

            <CartesianGrid
              horizontal={false}
              vertical={false}
              fill="url(#grid)"
            />

            <defs>
              <pattern
                id="grid"
                patternUnits="userSpaceOnUse"
                width="8"
                height="8"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="1"
                  opacity={0.4}
                  className="fill-neutral-400 dark:fill-neutral-700"
                />
              </pattern>
            </defs>

            <Line
              stroke="hsl(var(--chart-1))"
              dataKey="Revenue"
              type="natural"
              dot={{
                fill: "hsl(var(--chart-1))",
              }}
              activeDot={{
                r: 5,
              }}
            />

            <Line
              stroke="hsl(var(--chart-2))"
              dataKey="Expenses"
              type="natural"
              dot={{
                fill: "hsl(var(--chart-2))",
              }}
              activeDot={{
                color: "hsl(var(--chart-2))",
                r: 5,
              }}
            />

            <Legend
              verticalAlign="top"
              formatter={(value) => <ChartLegend value={value} />}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                top: -5,
                right: 0,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LineChart06
