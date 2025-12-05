"use client"

import * as React from "react"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@mijn-ui/shared-icons"
import { DayFlag, DayPicker, SelectionState, UI } from "react-day-picker"
import { VariantProps, tv } from "tailwind-variants"

const calendarStyles = tv({
  slots: {
    base: "border-outline-default bg-bg-default p-4",
    months: "relative flex flex-col sm:flex-row",
    month: "space-y-1.5",
    month_caption: "relative flex h-8 items-center justify-center font-normal",
    button_previous: [
      "inline-flex items-center justify-center  text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 size-8 gap-0 px-0 rounded-md",
      "bg-bg-default-alt text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 shadow-xs border focus-visible:ring-offset-2",
      "absolute left-1 top-0 z-10",
    ],
    button_next: [
      "inline-flex items-center justify-center text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 size-8 gap-0 px-0 rounded-md",
      "bg-bg-default-alt text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 shadow-xs border focus-visible:ring-offset-2",
      "border-outline-default absolute right-1 top-0 z-10",
    ],
    month_grid: "w-full border-collapse",
    weekdays: "flex",
    weekday:
      "text-fg-tertiary mb-1.5 flex size-8 items-center justify-center text-[0.8rem] font-normal",
    weeks: "space-y-1.5",
    week: "flex w-full",
    day: [
      "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-bg-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 focus-visible:ring-offset-2",
      "h-8 rounded-md px-3",
      "p-0 font-normal aria-selected:opacity-100",
    ],
    day_button:
      "[&:has([aria-selected].day-outside)]:bg-bg-brand/50 [&:has([aria-selected])]:bg-bg-brand relative size-8 p-0 text-center text-sm outline-none focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-r-md",
    range_end: "day-range-end",
    selected:
      "bg-bg-brand! text-on-bg-brand! hover:bg-bg-brand! hover:text-on-bg-brand! focus:!bg-bg-brandfocus:!text-on-bg-brand",
    range_middle:
      "aria-selected:bg-bg-secondary/75 aria-selected:text-fg-secondary",
    today:
      "bg-bg-secondary text-fg-secondary aria-selected:bg-bg-brand aria-selected:text-on-bg-brand",
    outside:
      "day-outside text-fg-secondary aria-selected:bg-bg-secondary/50 aria-selected:text-fg-tertiary opacity-50 aria-selected:opacity-30",
    disabled: "text-fg-tertiary opacity-50",
    hidden: "invisible",
  },
})

export type CalendarVariantProps = VariantProps<typeof calendarStyles>
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>
export { calendarStyles }
/* -------------------------------------------------------------------------- */

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  unstyled?: boolean
}

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
      data-slot="calendar"
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
        [UI.Weeks]: styles.weeks(),
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
