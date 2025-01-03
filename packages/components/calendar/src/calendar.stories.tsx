import React from "react"

import { DateRange } from "react-day-picker"

import { Badge } from "@mijn-ui/react-badge"
import type { Meta, StoryObj } from "@storybook/react"

import { Calendar, CalendarProps } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  args: {
    showOutsideDays: true,
    unstyled: false,
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

const renderDate = (date?: Date) => {
  return <Badge>{date?.toLocaleDateString("UK")}</Badge>
}

const renderDateRange = (dateRange?: DateRange) => {
  return (
    <>
      {renderDate(dateRange?.from)} - {renderDate(dateRange?.to)}
    </>
  )
}

const CalendarTemplate = (args: CalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={args.showOutsideDays}
        className="rounded-large border"
        unstyled={args.unstyled}
      />
      <p className="text-muted-foreground text-small mt-2">
        Selected Date: {renderDate(date)}
      </p>
    </div>
  )
}

const CalendarMultiple = (args: CalendarProps) => {
  const [dates, setDates] = React.useState<Date[] | undefined>([new Date()])
  return (
    <div>
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        showOutsideDays={args.showOutsideDays}
        className="rounded-large border"
        unstyled={args.unstyled}
      />
      <p className="text-muted-foreground text-small mt-2 w-64 leading-6">
        Selected Dates: {dates?.map((date) => renderDate(date))}
      </p>
    </div>
  )
}

const CalendarRange = (args: CalendarProps) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  return (
    <div>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        showOutsideDays={args.showOutsideDays}
        className="rounded-large border"
        unstyled={args.unstyled}
      />
      <p className="text-muted-foreground text-small mt-2 w-64">
        Selected Date Range: <br />
        {dateRange && renderDateRange(dateRange)}
      </p>
    </div>
  )
}

const CalendarUnstyled = (args: CalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={args.showOutsideDays}
        className="rounded-large border-small p-4"
        classNames={{
          button_previous: "absolute left-1 top-0 z-10",
          button_next: "absolute right-1 top-0 z-10",
          day: "aria-selected:bg-muted text-center",
          day_button: "p-2",
          months: "relative",
          month_caption: "flex justify-center",
          outside: "text-muted-foreground opacity-50",
          today: "bg-accent",
        }}
        unstyled={args.unstyled}
      />
      <p className="text-muted-foreground text-small mt-2">
        Selected Date: {renderDate(date)}
      </p>
    </div>
  )
}

export const Default: Story = {
  render: (args: CalendarProps) => <CalendarTemplate {...args} />,
}

export const MultipleSelect: Story = {
  render: (args: CalendarProps) => <CalendarMultiple {...args} />,
}

export const RangeSelect: Story = {
  render: (args: CalendarProps) => <CalendarRange {...args} />,
}

export const Unstyled: Story = {
  render: (args: CalendarProps) => <CalendarUnstyled {...args} />,
  args: {
    unstyled: true,
  },
}
