import { VariantProps } from "tailwind-variants"
import { tv } from "../utils/tv"
import { buttonStyles } from "./button"

const calendarStyles = tv({
  slots: {
    base: "border-border bg-background p-4",
    months: "relative flex flex-col sm:flex-row",
    month: "space-y-1.5",
    month_caption: "relative flex h-8 items-center justify-center font-normal",
    button_previous: [
      buttonStyles({ variant: "default", iconOnly: true, size: "sm" }).base(),
      "absolute left-1 top-0 z-10",
    ],
    button_next: [
      buttonStyles({ variant: "default", iconOnly: true, size: "sm" }).base(),
      "border-border absolute right-1 top-0 z-10",
    ],
    month_grid: "w-full border-collapse",
    weekdays: "flex",
    weekday:
      "text-muted-foreground mb-1.5 flex size-8 items-center justify-center text-[0.8rem] font-normal",
    weeks: "space-y-1.5",
    week: "flex w-full",
    day: [
      buttonStyles({ variant: "ghost", size: "sm" }).base(),
      "p-0 font-normal aria-selected:opacity-100",
    ],
    day_button:
      "[&:has([aria-selected].day-outside)]:bg-primary/50 [&:has([aria-selected])]:bg-primary relative size-8 p-0 text-center text-sm outline-none focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-r-md",
    range_end: "day-range-end",
    selected:
      "!bg-primary !text-primary-foreground hover:!bg-primary hover:!text-primary-foreground focus:!bg-primary focus:!text-primary-foreground",
    range_middle:
      "aria-selected:bg-secondary/75 aria-selected:text-secondary-foreground",
    today:
      "bg-secondary text-secondary-foreground aria-selected:bg-primary aria-selected:text-primary-foreground",
    outside:
      "day-outside text-secondary-foreground aria-selected:bg-secondary/50 aria-selected:text-muted-foreground opacity-50 aria-selected:opacity-30",
    disabled: "text-muted-foreground opacity-50",
    hidden: "invisible",
  },
})

export type CalendarVariantProps = VariantProps<typeof calendarStyles>
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>
export { calendarStyles }
