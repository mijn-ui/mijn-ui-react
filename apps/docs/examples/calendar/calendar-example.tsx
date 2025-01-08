"use client"

import * as React from "react"
import { Calendar } from "@mijn-ui/react"

const CalendarExample = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-large border"
    />
  )
}

export default CalendarExample
