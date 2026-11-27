import React from "react"
import { Badge } from "@mijn-ui/react-badge"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Calendar, CalendarProps, DateRange } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A grid of days to pick one date, several, or a range from. Arrow keys, Home / End and Page Up / Page Down move between days; names come from `Intl.DateTimeFormat` in the `locale` language.",
      },
    },
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
        className="rounded-(--mijn-radius-lg) border"
        unstyled={args.unstyled}
      />
      <p className="text-fg-tertiary text-sm mt-2">
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
        className="rounded-(--mijn-radius-lg) border"
        unstyled={args.unstyled}
      />
      <p className="text-fg-tertiary text-sm mt-2 w-64 leading-6">
        Selected Dates:{" "}
        {dates?.map((date) => (
          <React.Fragment key={date.getTime()}>
            {renderDate(date)}
          </React.Fragment>
        ))}
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
        className="rounded-(--mijn-radius-lg) border"
        unstyled={args.unstyled}
      />
      <p className="text-fg-tertiary text-sm mt-2 w-64">
        Selected Date Range: <br />
        {dateRange && renderDateRange(dateRange)}
      </p>
    </div>
  )
}

const CalendarTwoMonths = (args: CalendarProps) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  return (
    <div>
      <Calendar
        mode="range"
        numberOfMonths={2}
        selected={dateRange}
        onSelect={setDateRange}
        showOutsideDays={args.showOutsideDays}
        className="rounded-(--mijn-radius-lg) border"
        // The months sit flush by default; space them apart here.
        classNames={{ months: "gap-4" }}
        unstyled={args.unstyled}
      />
      <p className="text-fg-tertiary text-sm mt-2">
        Selected Date Range: {dateRange && renderDateRange(dateRange)}
      </p>
    </div>
  )
}

const CalendarDropdown = (args: CalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>()
  const year = new Date().getFullYear()
  return (
    <div>
      <Calendar
        mode="single"
        captionLayout="dropdown"
        startMonth={new Date(year - 100, 0)}
        endMonth={new Date(year + 5, 11)}
        selected={date}
        onSelect={setDate}
        showOutsideDays={args.showOutsideDays}
        className="rounded-(--mijn-radius-lg) border"
        unstyled={args.unstyled}
      />
      <p className="text-fg-tertiary text-sm mt-2">
        Selected Date: {renderDate(date)}
      </p>
    </div>
  )
}

const CalendarDisabledDays = (args: CalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <div>
      <Calendar
        mode="single"
        // Weekends, and anything before today.
        disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]}
        selected={date}
        onSelect={setDate}
        showOutsideDays={args.showOutsideDays}
        className="rounded-(--mijn-radius-lg) border"
        unstyled={args.unstyled}
      />
      <p className="text-fg-tertiary text-sm mt-2">
        Selected Date: {renderDate(date)}
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
        className="rounded-(--mijn-radius-lg) border p-4"
        classNames={{
          button_previous: "absolute left-1 top-0 z-10",
          button_next: "absolute right-1 top-0 z-10",
          day: "aria-selected:bg-bg-tertiary text-center",
          day_button: "p-2",
          months: "relative",
          month_caption: "flex justify-center",
          outside: "text-fg-tertiary opacity-50",
          today: "bg-accent",
        }}
        unstyled={args.unstyled}
      />
      <p className="text-fg-tertiary text-sm mt-2">
        Selected Date: {renderDate(date)}
      </p>
    </div>
  )
}

export const Default: Story = {
  render: (args: CalendarProps) => <CalendarTemplate {...args} />,
}

export const MultipleSelect: Story = {
  name: "Multiple",
  render: (args: CalendarProps) => <CalendarMultiple {...args} />,
}

export const RangeSelect: Story = {
  name: "Range",
  render: (args: CalendarProps) => <CalendarRange {...args} />,
}

export const TwoMonths: Story = {
  render: (args: CalendarProps) => <CalendarTwoMonths {...args} />,
}

export const DropdownCaption: Story = {
  render: (args: CalendarProps) => <CalendarDropdown {...args} />,
}

export const DisabledDays: Story = {
  render: (args: CalendarProps) => <CalendarDisabledDays {...args} />,
}

export const Unstyled: Story = {
  render: (args: CalendarProps) => <CalendarUnstyled {...args} />,
  args: {
    unstyled: true,
  },
}
