"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
  mergeRefs,
} from "@mijn-ui/react-core"
import { ChevronLeftIcon, ChevronRightIcon } from "@mijn-ui/shared-icons"
import { VariantProps, tv } from "tailwind-variants"
import {
  DateRange,
  Matcher,
  WeekStartsOn,
  addDays,
  addMonths,
  addToRange,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  endOfMonth,
  endOfWeek,
  isAfterDay,
  isBeforeDay,
  isMatch,
  isSameDay,
  isSameMonth,
  maxDay,
  minDay,
  newDate,
  rangeIncludesDate,
  startOfMonth,
  startOfWeek,
  toDay,
  toISODate,
} from "./date"

export type { DateRange, Matcher } from "./date"

const navButton = [
  "inline-flex items-center justify-center text-sm font-medium outline-none duration-300 ease-in-out focus-visible:mijn-focus-ring disabled:pointer-events-none disabled:opacity-50 size-8 gap-0 px-0 rounded-md",
  "bg-bg-default-alt text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand active:bg-bg-secondary/70 shadow-(--mijn-shadow-xs) border border-outline-default",
  // At `startMonth` / `endMonth` the buttons are `aria-disabled` rather than
  // `disabled`, so one that has focus keeps it.
  "aria-disabled:pointer-events-none aria-disabled:opacity-50",
]

const calendarStyles = tv({
  slots: {
    base: "border-outline-default bg-bg-default p-4",
    months: "relative flex flex-col sm:flex-row",
    month: "space-y-1.5",
    month_caption: "relative flex h-8 items-center justify-center font-normal",
    caption_label: "",
    // Out of the flex flow (its buttons are positioned anyway), so a `gap-*`
    // on `months` spaces the months rather than pushing the first one along.
    nav: "absolute inset-x-0 top-0",
    button_previous: [...navButton, "absolute left-1 top-0 z-10"],
    button_next: [
      ...navButton,
      "border-outline-default absolute right-1 top-0 z-10",
    ],
    // `captionLayout="dropdown"`: the month and year <select>s, between the
    // previous / next buttons and dressed like them.
    dropdowns: "flex items-center gap-1",
    dropdown: [
      "h-8 cursor-pointer rounded-md px-1 text-sm font-medium outline-none duration-300 ease-in-out focus-visible:mijn-focus-ring disabled:pointer-events-none disabled:opacity-50",
      "bg-bg-default-alt text-fg-default hover:bg-bg-secondary focus-visible:ring-outline-brand shadow-(--mijn-shadow-xs) border border-outline-default",
    ],
    month_grid: "w-full border-collapse",
    weekdays: "flex",
    weekday:
      "text-fg-tertiary mb-1.5 flex size-8 items-center justify-center text-[0.8rem] font-normal",
    weeks: "space-y-1.5",
    week: "flex w-full",
    // The day cell never takes focus itself — its button does — so the focus
    // ring keys off `has-focus-visible`; a plain `focus-visible` never matched
    // and keyboard focus on a day was invisible.
    day: [
      "inline-flex items-center justify-center gap-0.5 text-sm font-medium outline-none duration-300 ease-in-out has-focus-visible:mijn-focus-ring disabled:pointer-events-none disabled:opacity-50",
      "text-fg-default hover:bg-bg-secondary has-focus-visible:ring-outline-brand active:bg-bg-secondary/70",
      "h-8 rounded-md px-3",
      "p-0 font-normal aria-selected:opacity-100",
    ],
    day_button:
      "[&:has([aria-selected].day-outside)]:bg-bg-brand/50 [&:has([aria-selected])]:bg-bg-brand relative size-8 p-0 text-center text-sm outline-none focus-within:relative focus-within:z-20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md [&:has([aria-selected].day-range-end)]:rounded-r-md",
    range_start: "day-range-start",
    range_end: "day-range-end",
    // `focus-within`, not `focus`: this class lands on the day cell, and focus
    // lands on the button inside it.
    selected:
      "bg-bg-brand! text-on-bg-brand! hover:bg-bg-brand! hover:text-on-bg-brand! focus-within:bg-bg-brand! focus-within:text-on-bg-brand!",
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
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/** What is true of a day, as passed to `onSelect`. */
export type CalendarDayModifiers = {
  selected: boolean
  disabled: boolean
  hidden: boolean
  /** Shown in the grid of a month it does not belong to. */
  outside: boolean
  today: boolean
  /** Its button has focus. */
  focused: boolean
  range_start: boolean
  range_middle: boolean
  range_end: boolean
}

/**
 * Called when a day is clicked (or pressed with Enter / Space), with the new
 * selection, the day itself, what is true of it, and the click event.
 */
export type CalendarSelectHandler<T> = (
  selected: T,
  triggerDate: Date,
  modifiers: CalendarDayModifiers,
  e: React.MouseEvent<HTMLButtonElement>,
) => void

/** The text of the controls that are not dates, to translate with `locale`. */
export type CalendarLabels = {
  /** @default "Go to the Previous Month" */
  previousMonth?: string
  /** @default "Go to the Next Month" */
  nextMonth?: string
  /** `captionLayout="dropdown"` only. @default "Choose the Month" */
  monthDropdown?: string
  /** `captionLayout="dropdown"` only. @default "Choose the Year" */
  yearDropdown?: string
  /** The `<nav>` around the previous / next buttons. @default "Navigation bar" */
  navigation?: string
}

const defaultLabels: Required<CalendarLabels> = {
  previousMonth: "Go to the Previous Month",
  nextMonth: "Go to the Next Month",
  monthDropdown: "Choose the Month",
  yearDropdown: "Choose the Year",
  navigation: "Navigation bar",
}

type CalendarSelectionProps =
  | {
      /** Without a `mode` the calendar only shows dates. */
      mode?: undefined
      required?: undefined
      selected?: undefined
      onSelect?: undefined
      min?: undefined
      max?: undefined
    }
  | {
      mode: "single"
      /** The selected day cannot be clicked off again. */
      required?: false
      /**
       * The selected day. Controlled when `onSelect` is passed too; on its
       * own, only the initial selection.
       */
      selected?: Date | undefined
      onSelect?: CalendarSelectHandler<Date | undefined>
      min?: undefined
      max?: undefined
    }
  | {
      mode: "single"
      required: true
      selected: Date | undefined
      onSelect?: CalendarSelectHandler<Date>
      min?: undefined
      max?: undefined
    }
  | {
      mode: "multiple"
      required?: false
      selected?: Date[] | undefined
      onSelect?: CalendarSelectHandler<Date[] | undefined>
      /** Fewest days: once reached, selected days cannot be clicked off. */
      min?: number
      /** Most days: clicking one more starts the selection again from it. */
      max?: number
    }
  | {
      mode: "multiple"
      required: true
      selected: Date[] | undefined
      onSelect?: CalendarSelectHandler<Date[]>
      min?: number
      max?: number
    }
  | {
      mode: "range"
      required?: false
      selected?: DateRange | undefined
      onSelect?: CalendarSelectHandler<DateRange | undefined>
      /** Fewest nights between `from` and `to`. */
      min?: number
      /** Most nights between `from` and `to`. */
      max?: number
    }
  | {
      mode: "range"
      required: true
      selected: DateRange | undefined
      onSelect?: CalendarSelectHandler<DateRange>
      min?: number
      max?: number
    }

type CalendarBaseProps = Omit<
  React.ComponentPropsWithRef<"div">,
  // The calendar renders its own children; `onSelect` and `hidden` mean
  // something else here.
  "children" | "onSelect" | "hidden"
> &
  UnstyledComponentWithSlots<CalendarSlots> & {
    /** Days that cannot be selected, and that the arrow keys skip. */
    disabled?: Matcher | Matcher[]
    /** Days left blank in the grid. */
    hidden?: Matcher | Matcher[]
    /** The first month shown, if controlled; pair it with `onMonthChange`. */
    month?: Date
    /** The first month shown on mount, if uncontrolled. @default today */
    defaultMonth?: Date
    /** Called with the new first month when the user moves to another. */
    onMonthChange?: (month: Date) => void
    /**
     * The earliest month the user can move to; days before it are hidden.
     * With `captionLayout="dropdown"` it defaults to January 100 years ago.
     */
    startMonth?: Date
    /**
     * The latest month the user can move to; days after it are hidden. With
     * `captionLayout="dropdown"` it defaults to December of this year.
     */
    endMonth?: Date
    /** @default 1 */
    numberOfMonths?: number
    /** Show the days of the months before and after in the grid. @default true */
    showOutsideDays?: boolean
    /** Always show six weeks, so the calendar keeps its height. */
    fixedWeeks?: boolean
    /** The first day of the week, `0` being Sunday. @default 0 */
    weekStartsOn?: WeekStartsOn
    /** The day marked as today. @default the current date */
    today?: Date
    /**
     * `"dropdown"` replaces the caption with month and year `<select>`s,
     * limited by `startMonth` and `endMonth`. @default "label"
     */
    captionLayout?: "label" | "dropdown"
    /**
     * A BCP 47 language tag. The caption, weekday names and each day's
     * accessible name come from `Intl.DateTimeFormat` in this language. The
     * grid is always Gregorian. @default "en-US"
     */
    locale?: string
    /** The text of the navigation controls. */
    labels?: CalendarLabels
    /** Focus the day that takes Tab on mount — for a calendar in a popover. */
    autoFocus?: boolean
  }

export type CalendarProps = CalendarBaseProps & CalendarSelectionProps

/* -------------------------------------------------------------------------- */
/*                                 Formatting                                 */
/* -------------------------------------------------------------------------- */

/**
 * The same calendar date at UTC midnight. Formatted in UTC it prints the
 * local calendar date whatever the runtime's time zone.
 */
const asUTC = (date: Date) => {
  const utc = new Date(0)
  utc.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate())
  return utc
}

const createFormatters = (locale: string) => {
  const make = (options: Intl.DateTimeFormatOptions) => {
    const all = { ...options, timeZone: "UTC", calendar: "gregory" }
    try {
      return new Intl.DateTimeFormat(locale, all)
    } catch {
      // Not a valid language tag: English rather than a crashed page.
      return new Intl.DateTimeFormat("en-US", all)
    }
  }
  const caption = make({ year: "numeric", month: "long" })
  const dayLabel = make({
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const dayNumber = make({ day: "numeric" })
  const weekdayShort = make({ weekday: "short" })
  const weekdayLong = make({ weekday: "long" })
  const monthShort = make({ month: "short" })
  const yearNumber = make({ year: "numeric" })

  // `{ day: "numeric" }` alone still adds a suffix in some languages ("26日"),
  // so the grid takes just the number, in the language's own digits.
  const dayNumbers = Array.from({ length: 31 }, (_, i) => {
    const parts = dayNumber.formatToParts(asUTC(newDate(2000, 0, i + 1)))
    return parts.find((part) => part.type === "day")?.value ?? String(i + 1)
  })
  // 1970-01-04 was a Sunday.
  const weekdays = Array.from({ length: 7 }, (_, i) => {
    const date = asUTC(newDate(1970, 0, 4 + i))
    return { short: weekdayShort.format(date), long: weekdayLong.format(date) }
  })
  const monthNames = Array.from({ length: 12 }, (_, m) =>
    monthShort.format(asUTC(newDate(2000, m, 1))),
  )
  const captionParts = caption.formatToParts(asUTC(newDate(2000, 0, 1)))
  const yearFirst =
    captionParts.findIndex((part) => part.type === "year") <
    captionParts.findIndex((part) => part.type === "month")

  return {
    caption: (month: Date) => caption.format(asUTC(month)),
    dayLabel: (date: Date) => dayLabel.format(asUTC(date)),
    dayNumber: (date: Date) => dayNumbers[date.getDate() - 1],
    weekday: (dayOfWeek: number) => weekdays[dayOfWeek],
    monthName: (month: number) => monthNames[month],
    year: (year: number) => yearNumber.format(asUTC(newDate(year, 0, 1))),
    yearFirst,
  }
}

/** Inline, so the dropdown caption stays hidden when `unstyled`. */
const visuallyHidden: React.CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1,
  whiteSpace: "nowrap",
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

type Selection = Date | Date[] | DateRange | undefined

/** The selection from props, reduced to calendar dates. */
const normalizeSelection = (
  mode: CalendarProps["mode"],
  selected: unknown,
): Selection => {
  if (mode === "single") return toDay(selected as Date | undefined)
  if (mode === "multiple") {
    if (!Array.isArray(selected)) return undefined
    return selected
      .map((date: Date) => toDay(date))
      .filter((date): date is Date => !!date)
  }
  if (mode === "range") {
    if (!selected || typeof selected !== "object") return undefined
    const { from, to } = selected as DateRange
    return { from: toDay(from), to: toDay(to) }
  }
  return undefined
}

const normalizeWeekStart = (value: number | undefined): WeekStartsOn =>
  (((Math.trunc(value ?? 0) % 7) + 7) % 7 || 0) as WeekStartsOn

/** The weeks in `month`'s grid, seven days each. */
const getWeeks = (
  month: Date,
  weekStartsOn: WeekStartsOn,
  fixedWeeks: boolean,
): Date[][] => {
  const start = startOfWeek(month, weekStartsOn)
  const end = endOfWeek(endOfMonth(month), weekStartsOn)
  const days = fixedWeeks ? 42 : differenceInCalendarDays(end, start) + 1
  const weeks: Date[][] = []
  for (let i = 0; i < days; i += 7) {
    weeks.push(Array.from({ length: 7 }, (_, j) => addDays(start, i + j)))
  }
  return weeks
}

type FocusedDay = { date: Date; outside: boolean }

type Move = { by: "day" | "week" | "month" | "year"; amount: 1 | -1 }

/* -------------------------------------------------------------------------- */
/*                                  Calendar                                  */
/* -------------------------------------------------------------------------- */

const Calendar = (props: CalendarProps) => {
  const {
    mode,
    required = false,
    selected,
    onSelect,
    min,
    max,
    disabled,
    hidden,
    month: monthProp,
    defaultMonth,
    onMonthChange,
    startMonth,
    endMonth,
    numberOfMonths = 1,
    showOutsideDays = true,
    fixedWeeks = false,
    weekStartsOn: weekStartsOnProp,
    today: todayProp,
    captionLayout = "label",
    locale = "en-US",
    labels: labelsProp,
    autoFocus,
    unstyled,
    className,
    classNames,
    dir,
    ref,
    ...rootProps
  } = props as CalendarBaseProps & {
    mode?: "single" | "multiple" | "range"
    required?: boolean
    selected?: Selection
    onSelect?: CalendarSelectHandler<Selection>
    min?: number
    max?: number
  }

  const styles = createTVUnstyledSlots(calendarStyles(), unstyled)
  const slot = (name: CalendarSlots) =>
    styles[name]({ className: cn(classNames?.[name]) }) || undefined

  const labels = { ...defaultLabels, ...labelsProp }
  const format = React.useMemo(() => createFormatters(locale), [locale])
  const weekStartsOn = normalizeWeekStart(weekStartsOnProp)
  const isInteractive = mode !== undefined
  const captionId = React.useId()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const mergedRef = React.useMemo(() => mergeRefs([rootRef, ref]), [ref])

  const today = toDay(todayProp) ?? toDay(new Date())!

  /* ------------------------------ Navigation ------------------------------ */

  const hasDropdowns = captionLayout === "dropdown"
  const explicitStart = toDay(startMonth)
  const explicitEnd = toDay(endMonth)
  // The year dropdown needs a first and a last year, so it brings defaults.
  const navStart = explicitStart
    ? startOfMonth(explicitStart)
    : hasDropdowns
      ? newDate(
          Math.min(
            today.getFullYear(),
            explicitEnd?.getFullYear() ?? Infinity,
          ) - 100,
          0,
          1,
        )
      : undefined
  const navEnd = explicitEnd
    ? endOfMonth(explicitEnd)
    : hasDropdowns && navStart
      ? newDate(Math.max(today.getFullYear(), navStart.getFullYear()), 11, 31)
      : undefined
  const monthCount = Math.max(1, Math.trunc(numberOfMonths) || 1)

  /** The first month to show for `month`, kept inside the bounds. */
  const clampFirstMonth = (month: Date) => {
    let first = startOfMonth(month)
    if (navEnd) {
      const latest = addMonths(startOfMonth(navEnd), -(monthCount - 1))
      if (differenceInCalendarMonths(first, latest) > 0) first = latest
    }
    if (navStart && differenceInCalendarMonths(first, navStart) < 0) {
      first = startOfMonth(navStart)
    }
    return first
  }

  const controlledMonth = toDay(monthProp)
  const [uncontrolledMonth, setUncontrolledMonth] = React.useState(
    () => toDay(defaultMonth) ?? today,
  )
  const firstMonth = clampFirstMonth(controlledMonth ?? uncontrolledMonth)

  const displayMonths: Date[] = []
  for (let i = 0; i < monthCount; i++) {
    const month = addMonths(firstMonth, i)
    if (navEnd && differenceInCalendarMonths(month, navEnd) > 0) break
    displayMonths.push(month)
  }

  const previousMonth =
    navStart && differenceInCalendarMonths(firstMonth, navStart) <= 0
      ? undefined
      : addMonths(firstMonth, -1)
  const nextMonth =
    navEnd && differenceInCalendarMonths(navEnd, firstMonth) < monthCount
      ? undefined
      : addMonths(firstMonth, 1)

  const goToMonth = (month: Date) => {
    const first = clampFirstMonth(month)
    if (isSameMonth(first, firstMonth)) return
    if (!controlledMonth) setUncontrolledMonth(first)
    onMonthChange?.(first)
  }

  /* ------------------------------- Selection ------------------------------ */

  // As in react-day-picker: `selected` is controlled only alongside
  // `onSelect`; on its own it is the initial selection.
  const isControlled = onSelect !== undefined
  const [uncontrolledSelected, setUncontrolledSelected] =
    React.useState<Selection>(() => normalizeSelection(mode, selected))
  const selection = isControlled
    ? normalizeSelection(mode, selected)
    : uncontrolledSelected

  const isSelected = (date: Date): boolean => {
    if (!selection) return false
    if (mode === "single") return isSameDay(selection as Date, date)
    if (mode === "multiple") {
      return (selection as Date[]).some((day) => isSameDay(day, date))
    }
    if (mode === "range") return rangeIncludesDate(selection as DateRange, date)
    return false
  }

  const select = (
    date: Date,
    modifiers: CalendarDayModifiers,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    let next: Selection
    if (mode === "single") {
      const current = selection as Date | undefined
      next = !required && current && isSameDay(current, date) ? undefined : date
    } else if (mode === "multiple") {
      const current = (selection as Date[] | undefined) ?? []
      if (current.some((day) => isSameDay(day, date))) {
        if (current.length === min) return
        if (required && current.length === 1) return
        next = current.filter((day) => !isSameDay(day, date))
      } else {
        next = current.length === max ? [date] : [...current, date]
      }
    } else if (mode === "range") {
      next = addToRange(
        date,
        selection as DateRange | undefined,
        min,
        max,
        required,
      )
    } else {
      return
    }
    if (!isControlled) setUncontrolledSelected(next)
    onSelect?.(next, date, modifiers, e)
  }

  /* ------------------------------- Modifiers ------------------------------ */

  const [focused, setFocused] = React.useState<FocusedDay>()
  const [lastFocused, setLastFocused] = React.useState<FocusedDay>()

  const isHidden = (date: Date) =>
    isMatch(date, hidden) ||
    (!!navStart && isBeforeDay(date, navStart)) ||
    (!!navEnd && isAfterDay(date, navEnd))

  const getModifiers = (
    date: Date,
    displayMonth: Date,
  ): CalendarDayModifiers => {
    const outside = !isSameMonth(date, displayMonth)
    const dayHidden = isHidden(date) || (outside && !showOutsideDays)
    const range =
      mode === "range" && !dayHidden
        ? (selection as DateRange | undefined)
        : undefined
    const from = range?.from
    const to = range?.to
    return {
      selected: !dayHidden && isSelected(date),
      disabled: isMatch(date, disabled),
      hidden: dayHidden,
      outside,
      today: isSameDay(date, today),
      focused:
        !dayHidden &&
        !!focused &&
        focused.outside === outside &&
        isSameDay(focused.date, date),
      range_start: from && to ? isSameDay(date, from) : false,
      range_middle:
        from && to ? rangeIncludesDate({ from, to }, date, true) : false,
      range_end: from && to ? isSameDay(date, to) : false,
    }
  }

  const weeksByMonth = displayMonths.map((month) =>
    getWeeks(month, weekStartsOn, fixedWeeks),
  )

  /* --------------------------------- Focus -------------------------------- */

  const isVisible = (date: Date) =>
    displayMonths.some((month) => isSameMonth(month, date))
  /** Whether `date` can take focus: shown in its own month, and enabled. */
  const isFocusable = (date: Date) =>
    isVisible(date) && !isMatch(date, disabled) && !isHidden(date)

  // The one day the Tab key reaches (a roving tabindex): the day that has
  // focus or had it last, then the first selected day, then today, then the
  // first day that can take focus.
  const tabStop = (() => {
    if (!isInteractive) return undefined
    for (const day of [focused, lastFocused]) {
      if (day && !day.outside && isFocusable(day.date)) return day.date
    }
    const days = weeksByMonth.flatMap((weeks, index) =>
      weeks
        .flat()
        .filter((date) => isSameMonth(date, displayMonths[index]))
        .filter(isFocusable),
    )
    return (
      days.find((date) => isSelected(date)) ??
      days.find((date) => isSameDay(date, today)) ??
      days[0]
    )
  })()

  const focusDay = (date: Date) => {
    rootRef.current
      ?.querySelector<HTMLButtonElement>(
        `[data-day="${toISODate(date)}"]:not([data-outside]) > button`,
      )
      ?.focus()
  }

  // A key moved focus into a month not shown yet: follow once it is.
  const pendingFocus = React.useRef<Date>(undefined)
  const [, rerender] = React.useReducer((count: number) => count + 1, 0)
  React.useEffect(() => {
    const target = pendingFocus.current
    if (!target) return
    pendingFocus.current = undefined
    focusDay(target)
  })

  React.useEffect(() => {
    if (autoFocus && tabStop) focusDay(tabStop)
    // On mount only, like the HTML attribute.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** Where a key moves focus from `date`, skipping days that cannot take it. */
  const findFocusTarget = (date: Date, move: Move): Date | undefined => {
    const step = (from: Date) =>
      move.by === "day"
        ? addDays(from, move.amount)
        : move.by === "week"
          ? addDays(from, 7 * move.amount)
          : move.by === "month"
            ? addMonths(from, move.amount)
            : addYears(from, move.amount)

    let candidate = date
    // As react-day-picker does, give up after a year of unfocusable days.
    for (let attempt = 0; attempt <= 365; attempt++) {
      candidate = step(candidate)
      if (move.amount < 0 && navStart) candidate = maxDay(navStart, candidate)
      if (move.amount > 0 && navEnd) candidate = minDay(navEnd, candidate)
      if (!isMatch(candidate, disabled) && !isMatch(candidate, hidden)) {
        return candidate
      }
    }
    return undefined
  }

  /** Home / End: the first (last) day of the week that can take focus. */
  const findWeekEdge = (date: Date, edge: "start" | "end"): Date => {
    const start = startOfWeek(date, weekStartsOn)
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i)).filter(
      (day) =>
        !(navStart && isBeforeDay(day, navStart)) &&
        !(navEnd && isAfterDay(day, navEnd)) &&
        !isMatch(day, disabled) &&
        !isMatch(day, hidden),
    )
    return (edge === "start" ? days[0] : days[days.length - 1]) ?? date
  }

  const moveFocusTo = (target: Date) => {
    setFocused({ date: target, outside: false })
    if (isVisible(target)) {
      focusDay(target)
      return
    }
    // Move by as few months as it takes to show the target.
    pendingFocus.current = target
    goToMonth(
      isBeforeDay(target, firstMonth)
        ? target
        : addMonths(startOfMonth(target), -(displayMonths.length - 1)),
    )
    rerender()
  }

  const handleDayKeyDown =
    (date: Date) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const back = dir === "rtl" ? 1 : -1
      const moves: Record<string, Move | undefined> = {
        ArrowLeft: { by: "day", amount: back },
        ArrowRight: { by: "day", amount: back === 1 ? -1 : 1 },
        ArrowUp: { by: "week", amount: -1 },
        ArrowDown: { by: "week", amount: 1 },
        PageUp: { by: e.shiftKey ? "year" : "month", amount: -1 },
        PageDown: { by: e.shiftKey ? "year" : "month", amount: 1 },
      }
      const move = moves[e.key]
      let target: Date | undefined
      if (e.key === "Home") target = findWeekEdge(date, "start")
      else if (e.key === "End") target = findWeekEdge(date, "end")
      else if (move) target = findFocusTarget(date, move)
      // Enter and Space reach the button as a click.
      else return

      e.preventDefault()
      e.stopPropagation()
      if (target) moveFocusTo(target)
    }

  /* -------------------------------- Render -------------------------------- */

  const renderDay = (date: Date, displayMonth: Date) => {
    const modifiers = getModifiers(date, displayMonth)
    const iso = toISODate(date)
    const label = format.dayLabel(date)
    const className =
      [
        slot("day"),
        modifiers.outside && slot("outside"),
        modifiers.today && slot("today"),
        modifiers.disabled && slot("disabled"),
        modifiers.hidden && slot("hidden"),
        modifiers.selected && slot("selected"),
        modifiers.range_start && slot("range_start"),
        modifiers.range_middle && slot("range_middle"),
        modifiers.range_end && slot("range_end"),
      ]
        .filter(Boolean)
        .join(" ") || undefined
    const day = { date, outside: modifiers.outside }

    return (
      <td
        key={iso}
        role="gridcell"
        aria-selected={
          isInteractive && !modifiers.hidden ? modifiers.selected : undefined
        }
        aria-label={!isInteractive && !modifiers.hidden ? label : undefined}
        className={className}
        data-slot="calendar-day"
        data-day={iso}
        data-month={modifiers.outside ? iso.slice(0, 7) : undefined}
        data-selected={modifiers.selected || undefined}
        data-disabled={modifiers.disabled || undefined}
        data-hidden={modifiers.hidden || undefined}
        data-outside={modifiers.outside || undefined}
        data-focused={modifiers.focused || undefined}
        data-today={modifiers.today || undefined}
      >
        {modifiers.hidden ? (
          // Holds the cell's width: an empty cell collapses, and the rest of
          // its week slides under the wrong weekdays.
          <span aria-hidden className={slot("day_button")} />
        ) : isInteractive ? (
          <button
            type="button"
            className={slot("day_button")}
            data-slot="calendar-day-button"
            tabIndex={
              tabStop && !modifiers.outside && isSameDay(date, tabStop) ? 0 : -1
            }
            aria-label={label}
            aria-current={modifiers.today ? "date" : undefined}
            // A disabled day that has focus (its matcher changed under it)
            // keeps it: `aria-disabled` rather than `disabled`.
            disabled={(modifiers.disabled && !modifiers.focused) || undefined}
            aria-disabled={
              (modifiers.disabled && modifiers.focused) || undefined
            }
            onClick={(e) => {
              if (!modifiers.disabled) select(date, modifiers, e)
            }}
            onFocus={() => setFocused(day)}
            onBlur={() => {
              setLastFocused(day)
              setFocused(undefined)
            }}
            onKeyDown={handleDayKeyDown(date)}
          >
            {format.dayNumber(date)}
          </button>
        ) : (
          // Without a `mode` there is nothing to press, but the number still
          // takes a button's room, so the columns line up, and is centred in
          // it as a button's content would be.
          <span
            className={
              unstyled
                ? slot("day_button")
                : cn(
                    "inline-flex items-center justify-center",
                    slot("day_button"),
                  )
            }
          >
            {format.dayNumber(date)}
          </span>
        )}
      </td>
    )
  }

  const renderCaption = (displayMonth: Date, displayIndex: number) => {
    const id = `${captionId}-${displayIndex}`
    const caption = format.caption(displayMonth)
    if (!hasDropdowns || !navStart || !navEnd) {
      return (
        <span
          id={id}
          role="status"
          aria-live="polite"
          className={slot("caption_label")}
          data-slot="calendar-caption-label"
        >
          {caption}
        </span>
      )
    }

    const year = displayMonth.getFullYear()
    const isMonthOutOfBounds = (month: number) =>
      differenceInCalendarMonths(newDate(year, month, 1), navStart) < 0 ||
      differenceInCalendarMonths(newDate(year, month, 1), navEnd) > 0
    const years: number[] = []
    for (let y = navStart.getFullYear(); y <= navEnd.getFullYear(); y++) {
      years.push(y)
    }

    const monthSelect = (
      <select
        key="month"
        aria-label={labels.monthDropdown}
        className={slot("dropdown")}
        data-slot="calendar-month-dropdown"
        value={displayMonth.getMonth()}
        onChange={(e) =>
          goToMonth(
            addMonths(newDate(year, Number(e.target.value), 1), -displayIndex),
          )
        }
      >
        {Array.from({ length: 12 }, (_, month) => (
          <option
            key={month}
            value={month}
            disabled={isMonthOutOfBounds(month)}
          >
            {format.monthName(month)}
          </option>
        ))}
      </select>
    )
    const yearSelect = (
      <select
        key="year"
        aria-label={labels.yearDropdown}
        className={slot("dropdown")}
        data-slot="calendar-year-dropdown"
        value={year}
        onChange={(e) =>
          goToMonth(
            addMonths(
              newDate(Number(e.target.value), displayMonth.getMonth(), 1),
              -displayIndex,
            ),
          )
        }
      >
        {years.map((y) => (
          <option key={y} value={y}>
            {format.year(y)}
          </option>
        ))}
      </select>
    )

    return (
      <>
        <div className={slot("dropdowns")} data-slot="calendar-dropdowns">
          {format.yearFirst
            ? [yearSelect, monthSelect]
            : [monthSelect, yearSelect]}
        </div>
        {/* Names the grid, and is announced when the month changes. */}
        <span id={id} role="status" aria-live="polite" style={visuallyHidden}>
          {caption}
        </span>
      </>
    )
  }

  return (
    <div
      data-slot="calendar"
      data-mode={mode}
      data-multiple-months={displayMonths.length > 1 || undefined}
      dir={dir}
      className={
        styles.base({ className: cn(classNames?.base, className) }) || undefined
      }
      {...rootProps}
      ref={mergedRef}
    >
      <div className={slot("months")} data-slot="calendar-months">
        <nav
          aria-label={labels.navigation}
          className={slot("nav")}
          data-slot="calendar-nav"
        >
          <button
            type="button"
            className={slot("button_previous")}
            data-slot="calendar-previous"
            aria-label={labels.previousMonth}
            aria-disabled={!previousMonth || undefined}
            tabIndex={previousMonth ? undefined : -1}
            onClick={() => previousMonth && goToMonth(previousMonth)}
          >
            <ChevronLeftIcon className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            className={slot("button_next")}
            data-slot="calendar-next"
            aria-label={labels.nextMonth}
            aria-disabled={!nextMonth || undefined}
            tabIndex={nextMonth ? undefined : -1}
            onClick={() => nextMonth && goToMonth(nextMonth)}
          >
            <ChevronRightIcon className="size-4" aria-hidden />
          </button>
        </nav>

        {displayMonths.map((displayMonth, displayIndex) => (
          <div
            key={displayIndex}
            className={slot("month")}
            data-slot="calendar-month"
          >
            <div className={slot("month_caption")} data-slot="calendar-caption">
              {renderCaption(displayMonth, displayIndex)}
            </div>
            <table
              role="grid"
              aria-labelledby={`${captionId}-${displayIndex}`}
              aria-multiselectable={
                mode === "multiple" || mode === "range" || undefined
              }
              className={slot("month_grid")}
              data-slot="calendar-grid"
            >
              <thead aria-hidden>
                <tr className={slot("weekdays")}>
                  {Array.from({ length: 7 }, (_, i) => {
                    const name = format.weekday((weekStartsOn + i) % 7)
                    return (
                      <th
                        key={i}
                        scope="col"
                        aria-label={name.long}
                        className={slot("weekday")}
                      >
                        {name.short}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody className={slot("weeks")}>
                {weeksByMonth[displayIndex].map((week) => (
                  <tr key={toISODate(week[0])} className={slot("week")}>
                    {week.map((date) => renderDay(date, displayMonth))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Calendar }
