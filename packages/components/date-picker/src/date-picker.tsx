"use client"

/**
Adapted from https://github.com/sersavan/shadcn-calendar-component.

Full credit for the original implementation goes to [sersavan](https://github.com/sersavan), whose work served as the foundation for this component.  
 */
import * as React from "react"
import { Button } from "@mijn-ui/react-button"
import { Calendar } from "@mijn-ui/react-calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@mijn-ui/react-popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@mijn-ui/react-select"
import { ButtonVariantProps, buttonStyles, cn } from "@mijn-ui/react-theme"
import { CalendarIcon } from "@mijn-ui/shared-icons"
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from "date-fns"
import { formatInTimeZone, toDate } from "date-fns-tz"
import { DateRange, UI } from "react-day-picker"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export type CalendarDatePickerProps = React.ComponentPropsWithRef<"button"> &
  ButtonVariantProps & {
    id?: string
    className?: string
    date: DateRange
    closeOnSelect?: boolean
    numberOfMonths?: 1 | 2
    yearsRange?: number
    onDateSelect: (range: { from: Date; to: Date }) => void
  }

const CalendarDatePicker = ({
  id = "calendar-date-picker",
  className,
  date,
  closeOnSelect = false,
  numberOfMonths = 2,
  yearsRange = 10,
  onDateSelect,
  variant,
  ...props
}: CalendarDatePickerProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  const [selectedRange, setSelectedRange] = React.useState<string | null>(
    numberOfMonths === 2 ? "This Year" : "Today",
  )
  const [monthFrom, setMonthFrom] = React.useState<Date | undefined>(date?.from)
  const [yearFrom, setYearFrom] = React.useState<number | undefined>(
    date?.from?.getFullYear(),
  )
  const [monthTo, setMonthTo] = React.useState<Date | undefined>(
    numberOfMonths === 2 ? date?.to : date?.from,
  )
  const [yearTo, setYearTo] = React.useState<number | undefined>(
    numberOfMonths === 2 ? date?.to?.getFullYear() : date?.from?.getFullYear(),
  )
  const [highlightedPart, setHighlightedPart] = React.useState<string | null>(
    null,
  )

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const handleClose = () => setIsPopoverOpen(false)

  const handleTogglePopover = () => setIsPopoverOpen((prev) => !prev)

  const selectDateRange = (from: Date, to: Date, range: string) => {
    const startDate = startOfDay(toDate(from, { timeZone }))
    const endDate =
      numberOfMonths === 2 ? endOfDay(toDate(to, { timeZone })) : startDate
    onDateSelect({ from: startDate, to: endDate })
    setSelectedRange(range)
    setMonthFrom(from)
    setYearFrom(from.getFullYear())
    setMonthTo(to)
    setYearTo(to.getFullYear())
    /* eslint-disable-next-line */
    closeOnSelect && setIsPopoverOpen(false)
  }

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range) {
      let from = startOfDay(toDate(range.from as Date, { timeZone }))
      let to = range.to ? endOfDay(toDate(range.to, { timeZone })) : from
      if (numberOfMonths === 1) {
        if (range.from !== date.from) {
          to = from
        } else {
          from = startOfDay(toDate(range.to as Date, { timeZone }))
        }
      }
      onDateSelect({ from, to })
      setMonthFrom(from)
      setYearFrom(from.getFullYear())
      setMonthTo(to)
      setYearTo(to.getFullYear())
    }
    setSelectedRange(null)
  }

  const handleMonthChange = (newMonthIndex: number, part: string) => {
    setSelectedRange(null)
    if (part === "from") {
      if (yearFrom !== undefined) {
        if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return
        const newMonth = new Date(yearFrom, newMonthIndex, 1)
        const from =
          numberOfMonths === 2
            ? startOfMonth(toDate(newMonth, { timeZone }))
            : date?.from
              ? new Date(
                  date.from.getFullYear(),
                  newMonth.getMonth(),
                  date.from.getDate(),
                )
              : newMonth
        const to =
          numberOfMonths === 2
            ? date.to
              ? endOfDay(toDate(date.to, { timeZone }))
              : endOfMonth(toDate(newMonth, { timeZone }))
            : from
        if (from <= to) {
          onDateSelect({ from, to })
          setMonthFrom(newMonth)
          setMonthTo(date.to)
        }
      }
    } else {
      if (yearTo !== undefined) {
        if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return
        const newMonth = new Date(yearTo, newMonthIndex, 1)
        const from = date.from
          ? startOfDay(toDate(date.from, { timeZone }))
          : startOfMonth(toDate(newMonth, { timeZone }))
        const to =
          numberOfMonths === 2
            ? endOfMonth(toDate(newMonth, { timeZone }))
            : from
        if (from <= to) {
          onDateSelect({ from, to })
          setMonthTo(newMonth)
          setMonthFrom(date.from)
        }
      }
    }
  }

  const handleYearChange = (newYear: number, part: string) => {
    setSelectedRange(null)
    if (part === "from") {
      if (years.includes(newYear)) {
        const newMonth = monthFrom
          ? new Date(newYear, monthFrom ? monthFrom.getMonth() : 0, 1)
          : new Date(newYear, 0, 1)
        const from =
          numberOfMonths === 2
            ? startOfMonth(toDate(newMonth, { timeZone }))
            : date.from
              ? new Date(newYear, newMonth.getMonth(), date.from.getDate())
              : newMonth
        const to =
          numberOfMonths === 2
            ? date.to
              ? endOfDay(toDate(date.to, { timeZone }))
              : endOfMonth(toDate(newMonth, { timeZone }))
            : from
        if (from <= to) {
          onDateSelect({ from, to })
          setYearFrom(newYear)
          setMonthFrom(newMonth)
          setYearTo(date.to?.getFullYear())
          setMonthTo(date.to)
        }
      }
    } else {
      if (years.includes(newYear)) {
        const newMonth = monthTo
          ? new Date(newYear, monthTo.getMonth(), 1)
          : new Date(newYear, 0, 1)
        const from = date.from
          ? startOfDay(toDate(date.from, { timeZone }))
          : startOfMonth(toDate(newMonth, { timeZone }))
        const to =
          numberOfMonths === 2
            ? endOfMonth(toDate(newMonth, { timeZone }))
            : from
        if (from <= to) {
          onDateSelect({ from, to })
          setYearTo(newYear)
          setMonthTo(newMonth)
          setYearFrom(date.from?.getFullYear())
          setMonthFrom(date.from)
        }
      }
    }
  }

  const today = new Date()

  const years = Array.from(
    { length: yearsRange + 1 },
    (_, i) => today.getFullYear() - yearsRange / 2 + i,
  )

  const dateRanges = [
    { label: "Today", start: today, end: today },
    { label: "Yesterday", start: subDays(today, 1), end: subDays(today, 1) },
    {
      label: "This Week",
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: endOfWeek(today, { weekStartsOn: 1 }),
    },
    {
      label: "Last Week",
      start: subDays(startOfWeek(today, { weekStartsOn: 1 }), 7),
      end: subDays(endOfWeek(today, { weekStartsOn: 1 }), 7),
    },
    { label: "Last 7 Days", start: subDays(today, 6), end: today },
    {
      label: "This Month",
      start: startOfMonth(today),
      end: endOfMonth(today),
    },
    {
      label: "Last Month",
      start: startOfMonth(subDays(today, today.getDate())),
      end: endOfMonth(subDays(today, today.getDate())),
    },
    { label: "This Year", start: startOfYear(today), end: endOfYear(today) },
    {
      label: "Last Year",
      start: startOfYear(subDays(today, 365)),
      end: endOfYear(subDays(today, 365)),
    },
  ]

  const handleMouseOver = (part: string) => {
    setHighlightedPart(part)
  }

  const handleMouseLeave = () => {
    setHighlightedPart(null)
  }

  /* eslint-disable-next-line */
  const handleWheel = (event: React.WheelEvent, part: string) => {
    event.preventDefault()
    setSelectedRange(null)
    if (highlightedPart === "firstDay") {
      const newDate = new Date(date.from as Date)
      const increment = event.deltaY > 0 ? -1 : 1
      newDate.setDate(newDate.getDate() + increment)
      if (newDate <= (date.to as Date)) {
        /* eslint-disable-next-line */
        numberOfMonths === 2
          ? onDateSelect({ from: newDate, to: new Date(date.to as Date) })
          : onDateSelect({ from: newDate, to: newDate })
        setMonthFrom(newDate)
      } else if (newDate > (date.to as Date) && numberOfMonths === 1) {
        onDateSelect({ from: newDate, to: newDate })
        setMonthFrom(newDate)
      }
    } else if (highlightedPart === "firstMonth") {
      const currentMonth = monthFrom ? monthFrom.getMonth() : 0
      const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1)
      handleMonthChange(newMonthIndex, "from")
    } else if (highlightedPart === "firstYear" && yearFrom !== undefined) {
      const newYear = yearFrom + (event.deltaY > 0 ? -1 : 1)
      handleYearChange(newYear, "from")
    } else if (highlightedPart === "secondDay") {
      const newDate = new Date(date.to as Date)
      const increment = event.deltaY > 0 ? -1 : 1
      newDate.setDate(newDate.getDate() + increment)
      if (newDate >= (date.from as Date)) {
        onDateSelect({ from: new Date(date.from as Date), to: newDate })
        setMonthTo(newDate)
      }
    } else if (highlightedPart === "secondMonth") {
      const currentMonth = monthTo ? monthTo.getMonth() : 0
      const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1)
      handleMonthChange(newMonthIndex, "to")
    } else if (highlightedPart === "secondYear" && yearTo !== undefined) {
      const newYear = yearTo + (event.deltaY > 0 ? -1 : 1)
      handleYearChange(newYear, "to")
    }
  }

  React.useEffect(() => {
    const firstDayElement = document.getElementById(`firstDay-${id}`)
    const firstMonthElement = document.getElementById(`firstMonth-${id}`)
    const firstYearElement = document.getElementById(`firstYear-${id}`)
    const secondDayElement = document.getElementById(`secondDay-${id}`)
    const secondMonthElement = document.getElementById(`secondMonth-${id}`)
    const secondYearElement = document.getElementById(`secondYear-${id}`)

    const elements = [
      firstDayElement,
      firstMonthElement,
      firstYearElement,
      secondDayElement,
      secondMonthElement,
      secondYearElement,
    ]

    const addPassiveEventListener = (element: HTMLElement | null) => {
      if (element) {
        element.addEventListener(
          "wheel",
          handleWheel as unknown as EventListener,
          {
            passive: false,
          },
        )
      }
    }

    elements.forEach(addPassiveEventListener)

    return () => {
      elements.forEach((element) => {
        if (element) {
          element.removeEventListener(
            "wheel",
            handleWheel as unknown as EventListener,
          )
        }
      })
    }
  }, [highlightedPart, date, id, handleWheel])

  const formatWithTz = (date: Date, fmt: string) =>
    formatInTimeZone(date, timeZone, fmt)

  return (
    <>
      <style>
        {`
            .date-part {
              touch-action: none;
            }
          `}
      </style>
      <Popover modal open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger unstyled asChild>
          <button
            id="date"
            {...props}
            className={cn(
              "w-auto",
              buttonStyles({ variant, className }).base(),
            )}
            onClick={handleTogglePopover}
            suppressHydrationWarning
          >
            <CalendarIcon className="mr-2 size-4" />
            <span>
              {date?.from ? (
                date.to ? (
                  <>
                    <span
                      id={`firstDay-${id}`}
                      className={cn(
                        "date-part",
                        highlightedPart === "firstDay" && "font-bold underline",
                      )}
                      onMouseOver={() => handleMouseOver("firstDay")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {formatWithTz(date.from, "dd")}
                    </span>{" "}
                    <span
                      id={`firstMonth-${id}`}
                      className={cn(
                        "date-part",
                        highlightedPart === "firstMonth" &&
                          "font-bold underline",
                      )}
                      onMouseOver={() => handleMouseOver("firstMonth")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {formatWithTz(date.from, "LLL")}
                    </span>
                    ,{" "}
                    <span
                      id={`firstYear-${id}`}
                      className={cn(
                        "date-part",
                        highlightedPart === "firstYear" &&
                          "font-bold underline",
                      )}
                      onMouseOver={() => handleMouseOver("firstYear")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {formatWithTz(date.from, "y")}
                    </span>
                    {numberOfMonths === 2 && (
                      <>
                        {" - "}
                        <span
                          id={`secondDay-${id}`}
                          className={cn(
                            "date-part",
                            highlightedPart === "secondDay" &&
                              "font-bold underline",
                          )}
                          onMouseOver={() => handleMouseOver("secondDay")}
                          onMouseLeave={handleMouseLeave}
                        >
                          {formatWithTz(date.to, "dd")}
                        </span>{" "}
                        <span
                          id={`secondMonth-${id}`}
                          className={cn(
                            "date-part",
                            highlightedPart === "secondMonth" &&
                              "font-bold underline",
                          )}
                          onMouseOver={() => handleMouseOver("secondMonth")}
                          onMouseLeave={handleMouseLeave}
                        >
                          {formatWithTz(date.to, "LLL")}
                        </span>
                        ,{" "}
                        <span
                          id={`secondYear-${id}`}
                          className={cn(
                            "date-part",
                            highlightedPart === "secondYear" &&
                              "font-bold underline",
                          )}
                          onMouseOver={() => handleMouseOver("secondYear")}
                          onMouseLeave={handleMouseLeave}
                        >
                          {formatWithTz(date.to, "y")}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <span
                      id="day"
                      className={cn(
                        "date-part",
                        highlightedPart === "day" && "font-bold underline",
                      )}
                      onMouseOver={() => handleMouseOver("day")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {formatWithTz(date.from, "dd")}
                    </span>{" "}
                    <span
                      id="month"
                      className={cn(
                        "date-part",
                        highlightedPart === "month" && "font-bold underline",
                      )}
                      onMouseOver={() => handleMouseOver("month")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {formatWithTz(date.from, "LLL")}
                    </span>
                    ,{" "}
                    <span
                      id="year"
                      className={cn(
                        "date-part",
                        highlightedPart === "year" && "font-bold underline",
                      )}
                      onMouseOver={() => handleMouseOver("year")}
                      onMouseLeave={handleMouseLeave}
                    >
                      {formatWithTz(date.from, "y")}
                    </span>
                  </>
                )
              ) : (
                <span>Pick a date</span>
              )}
            </span>
          </button>
        </PopoverTrigger>
        {isPopoverOpen && (
          <PopoverContent
            collisionPadding={{ top: 20, bottom: 20 }}
            className="w-auto"
            align="center"
            onInteractOutside={handleClose}
            onEscapeKeyDown={handleClose}
            style={{
              maxHeight: "var(--radix-popover-content-available-height)",
              overflowY: "auto",
            }}
          >
            <div className="flex">
              {numberOfMonths === 2 && (
                <div className="border-foreground/10 hidden flex-col gap-1 border-r pr-4 text-left md:flex">
                  {dateRanges.map(({ label, start, end }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "hover:opacity-hover hover:text-primary-foreground justify-start",
                        selectedRange === label &&
                          "bg-primary text-primary-foreground hover:opacity-hover hover:text-foreground",
                      )}
                      onClick={() => {
                        selectDateRange(start, end, label)
                        setMonthFrom(start)
                        setYearFrom(start.getFullYear())
                        setMonthTo(end)
                        setYearTo(end.getFullYear())
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <div className="ml-3 flex gap-2">
                    <Select
                      onValueChange={(value) => {
                        handleMonthChange(months.indexOf(value), "from")
                        setSelectedRange(null)
                      }}
                      value={
                        monthFrom ? months[monthFrom.getMonth()] : undefined
                      }
                    >
                      <SelectTrigger className="hover:bg-accent hover:text-accent-foreground hidden w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, idx) => (
                          <SelectItem key={idx} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(value) => {
                        handleYearChange(Number(value), "from")
                        setSelectedRange(null)
                      }}
                      value={yearFrom ? yearFrom.toString() : undefined}
                    >
                      <SelectTrigger className="hover:bg-accent hover:text-accent-foreground hidden w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year, idx) => (
                          <SelectItem key={idx} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {numberOfMonths === 2 && (
                    <div className="flex gap-2">
                      <Select
                        onValueChange={(value) => {
                          handleMonthChange(months.indexOf(value), "to")
                          setSelectedRange(null)
                        }}
                        value={monthTo ? months[monthTo.getMonth()] : undefined}
                      >
                        <SelectTrigger className="hover:bg-accent hover:text-accent-foreground hidden w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month, idx) => (
                            <SelectItem key={idx} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={(value) => {
                          handleYearChange(Number(value), "to")
                          setSelectedRange(null)
                        }}
                        value={yearTo ? yearTo.toString() : undefined}
                      >
                        <SelectTrigger className="hover:bg-accent hover:text-accent-foreground hidden w-[122px] font-medium focus:ring-0 focus:ring-offset-0 sm:flex">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year, idx) => (
                            <SelectItem key={idx} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <Calendar
                    mode="range"
                    defaultMonth={monthFrom}
                    month={monthFrom}
                    onMonthChange={setMonthFrom}
                    selected={date}
                    onSelect={handleDateSelect}
                    numberOfMonths={numberOfMonths}
                    showOutsideDays={false}
                    className={cn("flex", className)}
                    classNames={{
                      [UI.Months]:
                        "relative flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    }}
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </>
  )
}

export { CalendarDatePicker }
