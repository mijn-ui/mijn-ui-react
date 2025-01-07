import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { CalendarDatePicker, CalendarDatePickerProps } from "./date-picker"

const meta: Meta<typeof CalendarDatePicker> = {
  title: "Components/DatePicker",
  component: CalendarDatePicker,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    id: "calendar-date-picker",
    date: {
      from: new Date(new Date().getFullYear(), 0, 1),
      to: new Date(),
    },
    numberOfMonths: 2,
    closeOnSelect: false,
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    date: {
      table: {
        disable: true,
      },
    },
    numberOfMonths: {
      control: "inline-radio",
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CalendarDatePicker>

const DatePickerTemplate = (args: CalendarDatePickerProps) => {
  const [selectedDateRange, setSelectedDateRange] = React.useState({
    from: args.date.from,
    to: args.date.to,
  })

  return (
    <div className="mx-auto mt-20 max-w-max p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Calendar Date Picker Component
      </h1>
      <CalendarDatePicker
        color="default"
        date={selectedDateRange}
        onDateSelect={setSelectedDateRange}
        numberOfMonths={args.numberOfMonths}
        yearsRange={args.yearsRange}
        closeOnSelect={args.closeOnSelect}
      />
      <div className="mt-4">
        <h2 className="text-medium font-semibold">Selected Date Range:</h2>
        <p className="text-small">
          {selectedDateRange.from?.toDateString()} -{" "}
          {selectedDateRange.to?.toDateString()}
        </p>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: (args: CalendarDatePickerProps) => <DatePickerTemplate {...args} />,
}
