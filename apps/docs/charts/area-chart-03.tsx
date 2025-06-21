"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "./chart"

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
    <Card className="flex size-full min-h-80 flex-col items-center justify-between gap-4">
      <CardHeader className="flex w-full flex-col items-start space-y-0">
        <CardTitle className="text-lg">Area Chart - Step</CardTitle>
        <CardDescription>Trends in monthly revenue.</CardDescription>
      </CardHeader>
      <CardContent className="flex h-64 w-[calc(543/16*1rem)] max-w-full items-center rounded-none text-xs">
        <ChartContainer>
          <AreaChart data={chartData}>
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ transform: "translate(-3, 0)" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <XAxis dataKey="date" tickLine={false} axisLine={false} />

            <Tooltip content={<ChartTooltip hideLabel />} />

            <CartesianGrid horizontal={false} strokeDasharray={3} />

            <Area
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--chart-1))"
              fillOpacity={0.1}
              type="step"
              dataKey="Revenue"
              activeDot={{
                r: 5,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AreaChart03
