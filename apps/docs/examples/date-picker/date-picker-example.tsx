"use client"

import { useState } from "react"
import { CalendarDatePicker } from "@mijn-ui/react"

const CalendarDatePickerExample = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  })

  return (
    <div className="max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Calendar Date Picker Component
      </h1>
      <CalendarDatePicker
        color="default"
        date={selectedDateRange}
        onDateSelect={setSelectedDateRange}
      />
      <div className="mt-4">
        <h2 className="text-medium font-semibold">Selected Date Range:</h2>
        <p className="text-small">
          {selectedDateRange.from.toDateString()} -{" "}
          {selectedDateRange.to.toDateString()}
        </p>
      </div>
    </div>
  )
}

export default CalendarDatePickerExample
