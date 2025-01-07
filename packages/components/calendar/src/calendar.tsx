"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import { UnstyledProps, calendarStyles } from "@mijn-ui/react-theme"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@mijn-ui/shared-icons"
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker"

export type CalendarProps = React.ComponentProps<typeof DayPicker> &
  UnstyledProps

export const Calendar = ({
  unstyled,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  const styles = createTVUnstyledSlots(calendarStyles(), unstyled)

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={styles.base({ className })}
      classNames={{
        [UI.Months]: styles.months(),
        [UI.Month]: styles.month(),
        [UI.MonthCaption]: styles.month_caption(),
        [UI.PreviousMonthButton]: styles.button_previous(),
        [UI.NextMonthButton]: styles.button_next(),
        [UI.MonthGrid]: styles.month_grid(),
        [UI.Weekdays]: styles.weekdays(),
        [UI.Weekday]: styles.weekday(),
        [UI.Week]: styles.week(),
        [UI.Day]: styles.day(),
        [UI.DayButton]: styles.day_button(),
        [SelectionState.range_end]: styles.range_end(),
        [SelectionState.selected]: styles.selected(),
        [SelectionState.range_middle]: styles.range_middle(),
        [DayFlag.today]: styles.today(),
        [DayFlag.outside]: styles.outside(),
        [DayFlag.disabled]: styles.disabled(),
        [DayFlag.hidden]: styles.hidden(),
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => <Chevron {...props} />,
      }}
      {...props}
    />
  )
}

const Chevron = ({ orientation = "left" }) => {
  switch (orientation) {
    case "left":
      return <ChevronLeftIcon className="size-4" />
    case "right":
      return <ChevronRightIcon className="size-4" />
    case "up":
      return <ChevronUpIcon className="size-4" />
    case "down":
      return <ChevronDownIcon className="size-4" />
    default:
      return null
  }
}
