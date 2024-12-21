import { tv, VariantProps } from "tailwind-variants"
import { buttonStyles } from "./button"

const calendarStyles = tv({
  slots: {
    base: "border-main-border bg-surface p-3",
    months: "relative flex flex-col sm:flex-row",
    month: "space-y-0",
    month_caption: "relative flex items-center justify-center py-2",
    button_previous: [
      buttonStyles({ color: "muted", variant: "outlined" }).base(),
      "absolute left-1 top-0 z-10 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    ],
    button_next: [
      buttonStyles({ color: "muted", variant: "outlined" }).base(),
      "absolute right-1 top-0 z-10 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    ],
    month_grid: "w-full border-collapse space-y-1",
    weekdays: "flex",
    weekday:
      "text-muted-text flex size-9 items-center justify-center text-[0.8rem] font-normal",
    week: "mt-0.5 flex w-full",
    day: [
      buttonStyles({ variant: "text", color: "accent" }).base(),
      "size-9 p-0 font-normal aria-selected:opacity-100",
    ],
    day_button:
      "[&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-r-md",
    range_end: "day-range-end",
    selected:
      "bg-primary text-primary-text hover:bg-primary hover:text-primary-text focus:bg-primary focus:text-primary-text",
    range_middle: "aria-selected:bg-accent/75 aria-selected:text-accent-text",
    today: "bg-accent text-accent-text",
    outside:
      "day-outside text-muted-text aria-selected:bg-accent/50 aria-selected:text-muted-text opacity-50 aria-selected:opacity-30",
    disabled: "text-muted-text opacity-50",
    hidden: "invisible",
  },
})

export type CalendarVariantProps = VariantProps<typeof calendarStyles>
export type CalendarSlots = keyof ReturnType<typeof calendarStyles>
export { calendarStyles }
