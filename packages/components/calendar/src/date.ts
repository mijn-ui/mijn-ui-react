/**
 * Calendar-date helpers for the Calendar component.
 *
 * Every date here is a *local calendar date*: what matters is its year, month
 * and day in the runtime's time zone, never its timestamp. Dates are built
 * with the `Date(y, m, d)` constructor and compared field by field, and no
 * helper adds or subtracts milliseconds — a day is not always 24 hours long,
 * and in some zones local midnight does not exist on the day clocks change.
 */

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * A range of days, as `mode="range"` selects them. `from` is set first; `to`
 * stays `undefined` until the second click.
 */
export type DateRange = { from: Date | undefined; to?: Date | undefined }

/**
 * Describes a set of days, for `disabled` and `hidden`:
 *
 * - `true` / `false` — every day / no day
 * - `Date` — that day
 * - `Date[]` — any of those days
 * - `{ from, to }` — the days from `from` to `to`, both included
 * - `{ before }` — the days before that day
 * - `{ after }` — the days after that day
 * - `{ before, after }` — the days between them when `before` is later than
 *   `after`, otherwise the days outside them; the two days themselves never
 *   match
 * - `{ dayOfWeek }` — those weekdays, `0` being Sunday
 * - `(date) => boolean` — the days the function returns `true` for
 *
 * Only the calendar date of each `Date` counts; its time of day is ignored.
 */
export type Matcher =
  | boolean
  | ((date: Date) => boolean)
  | Date
  | Date[]
  | DateRange
  | { before: Date; after: Date }
  | { before: Date }
  | { after: Date }
  | { dayOfWeek: number | number[] }

export type WeekStartsOn = 0 | 1 | 2 | 3 | 4 | 5 | 6

/* -------------------------------------------------------------------------- */
/*                               Construction                                 */
/* -------------------------------------------------------------------------- */

/**
 * Local midnight of year `y`, month `m` (0-based) and day `d`. Out-of-range
 * months and days roll over, as with `new Date(y, m, d)` — which this avoids
 * only because it maps years 0–99 to 1900–1999.
 */
export const newDate = (y: number, m: number, d: number): Date => {
  const date = new Date(2000, 0, 1)
  date.setFullYear(y, m, d)
  return date
}

export const isValidDate = (value: unknown): value is Date =>
  Object.prototype.toString.call(value) === "[object Date]" &&
  !Number.isNaN((value as Date).getTime())

/** The calendar date of `date`, at local midnight; `undefined` if invalid. */
export const toDay = (date: Date | undefined | null): Date | undefined =>
  isValidDate(date)
    ? newDate(date.getFullYear(), date.getMonth(), date.getDate())
    : undefined

/* -------------------------------------------------------------------------- */
/*                                Arithmetic                                  */
/* -------------------------------------------------------------------------- */

export const addDays = (date: Date, amount: number): Date =>
  newDate(date.getFullYear(), date.getMonth(), date.getDate() + amount)

const daysInMonth = (y: number, m: number) => newDate(y, m + 1, 0).getDate()

/** Moves by whole months, keeping the day but never past the month's end. */
export const addMonths = (date: Date, amount: number): Date => {
  const y = date.getFullYear()
  const m = date.getMonth() + amount
  return newDate(y, m, Math.min(date.getDate(), daysInMonth(y, m)))
}

export const addYears = (date: Date, amount: number): Date =>
  addMonths(date, amount * 12)

export const startOfMonth = (date: Date): Date =>
  newDate(date.getFullYear(), date.getMonth(), 1)

export const endOfMonth = (date: Date): Date =>
  newDate(date.getFullYear(), date.getMonth() + 1, 0)

export const startOfWeek = (date: Date, weekStartsOn: WeekStartsOn): Date =>
  addDays(date, -((date.getDay() - weekStartsOn + 7) % 7))

export const endOfWeek = (date: Date, weekStartsOn: WeekStartsOn): Date =>
  addDays(startOfWeek(date, weekStartsOn), 6)

/* -------------------------------------------------------------------------- */
/*                                Comparison                                  */
/* -------------------------------------------------------------------------- */

/**
 * A day's position on a continuous count of days. Built in UTC, which has no
 * daylight saving, from the local calendar fields — so two consecutive local
 * days are always exactly one apart, whatever the local zone did in between.
 */
const dayIndex = (date: Date): number => {
  const utc = new Date(0)
  utc.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate())
  return Math.round(utc.getTime() / 86_400_000)
}

/** Whole calendar days from `right` to `left`: positive if `left` is later. */
export const differenceInCalendarDays = (left: Date, right: Date): number =>
  dayIndex(left) - dayIndex(right)

/** Whole calendar months from `right` to `left`. */
export const differenceInCalendarMonths = (left: Date, right: Date): number =>
  (left.getFullYear() - right.getFullYear()) * 12 +
  (left.getMonth() - right.getMonth())

export const isSameDay = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate()

export const isSameMonth = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth()

export const isBeforeDay = (left: Date, right: Date): boolean =>
  differenceInCalendarDays(left, right) < 0

export const isAfterDay = (left: Date, right: Date): boolean =>
  differenceInCalendarDays(left, right) > 0

export const minDay = (left: Date, right: Date): Date =>
  isBeforeDay(right, left) ? right : left

export const maxDay = (left: Date, right: Date): Date =>
  isAfterDay(right, left) ? right : left

/** `yyyy-MM-dd`, for `data-day` attributes and keys. */
export const toISODate = (date: Date): string => {
  const pad = (value: number, length: number) =>
    String(value).padStart(length, "0")
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`
}

/* -------------------------------------------------------------------------- */
/*                                 Matchers                                   */
/* -------------------------------------------------------------------------- */

/**
 * Whether `date` is in `range`, ends included unless `excludeEnds`. A range
 * whose `to` is before its `from` is read the other way round; a range with
 * only one end set contains just that day (and nothing if `excludeEnds`).
 */
export const rangeIncludesDate = (
  range: DateRange,
  date: Date,
  excludeEnds = false,
): boolean => {
  let { from, to } = range
  if (from && to) {
    if (differenceInCalendarDays(to, from) < 0) [from, to] = [to, from]
    const edge = excludeEnds ? 1 : 0
    return (
      differenceInCalendarDays(date, from) >= edge &&
      differenceInCalendarDays(to, date) >= edge
    )
  }
  if (excludeEnds) return false
  if (to) return isSameDay(to, date)
  if (from) return isSameDay(from, date)
  return false
}

const matches = (date: Date, matcher: Matcher): boolean => {
  if (typeof matcher === "boolean") return matcher
  if (typeof matcher === "function") return matcher(date)
  if (isValidDate(matcher)) return isSameDay(date, matcher)
  if (Array.isArray(matcher)) {
    return matcher.some((day) => isValidDate(day) && isSameDay(date, day))
  }
  if (matcher === null || typeof matcher !== "object") return false
  if ("from" in matcher) return rangeIncludesDate(matcher, date)
  if ("dayOfWeek" in matcher) {
    const days = ([] as number[]).concat(matcher.dayOfWeek)
    return days.includes(date.getDay())
  }
  if ("before" in matcher && "after" in matcher) {
    const isBefore = differenceInCalendarDays(matcher.before, date) > 0
    const isAfter = differenceInCalendarDays(matcher.after, date) < 0
    // `{ before: Dec 10, after: Dec 1 }` is the days between them;
    // `{ before: Dec 1, after: Dec 10 }` is everything but Dec 1–10.
    return isAfterDay(matcher.before, matcher.after)
      ? isBefore && isAfter
      : isBefore || isAfter
  }
  if ("after" in matcher)
    return differenceInCalendarDays(date, matcher.after) > 0
  if ("before" in matcher) {
    return differenceInCalendarDays(matcher.before, date) > 0
  }
  return false
}

/** Whether `date` matches `matchers` — one, or any of a list. */
export const isMatch = (
  date: Date,
  matchers: Matcher | Matcher[] | undefined,
): boolean => {
  if (matchers === undefined) return false
  // A bare `Date[]` is a list of `Date` matchers; either reading gives the
  // same answer.
  return Array.isArray(matchers)
    ? (matchers as Matcher[]).some((matcher) => matches(date, matcher))
    : matches(date, matchers)
}

/* -------------------------------------------------------------------------- */
/*                                 Selection                                  */
/* -------------------------------------------------------------------------- */

/**
 * The range after clicking `date`, as react-day-picker v9's `addToRange` has
 * it, so moving off react-day-picker changes nothing for range pickers:
 *
 * - an empty range starts at `date` (and ends there too unless `min` is set);
 * - a range with only `from` gets its other end, either side of `from`;
 *   clicking `from` again closes it on that day, or — with `min` — clears it
 *   (keeps it if `required`);
 * - a complete range moves the end nearest the click: a day before `from`
 *   becomes `from`, any later day becomes `to`; clicking a one-day range
 *   clears it unless `required`.
 *
 * `min` and `max` count the nights between `from` and `to` (a range from the
 * 1st to the 8th is 7): a range outside them restarts at `date`.
 */
export const addToRange = (
  date: Date,
  initialRange: DateRange | undefined,
  min = 0,
  max = 0,
  required = false,
): DateRange | undefined => {
  const { from, to } = initialRange ?? {}
  let range: DateRange | undefined

  if (!from && !to) {
    range = { from: date, to: min > 0 ? undefined : date }
  } else if (from && !to) {
    if (isSameDay(from, date)) {
      if (min === 0) range = { from, to: date }
      else if (required) range = { from, to: undefined }
      else range = undefined
    } else if (isBeforeDay(date, from)) {
      range = { from: date, to: from }
    } else {
      range = { from, to: date }
    }
  } else if (from && to) {
    if (isSameDay(from, date) && isSameDay(to, date)) {
      range = required ? { from, to } : undefined
    } else if (isSameDay(from, date)) {
      range = { from, to: min > 0 ? undefined : date }
    } else if (isSameDay(to, date)) {
      range = { from: date, to: min > 0 ? undefined : date }
    } else if (isBeforeDay(date, from)) {
      range = { from: date, to }
    } else {
      range = { from, to: date }
    }
  }
  // `{ from: undefined, to }` matches no branch and clears, as in
  // react-day-picker.

  if (range?.from && range.to) {
    const nights = differenceInCalendarDays(range.to, range.from)
    if ((max > 0 && nights > max) || (min > 1 && nights < min)) {
      range = { from: date, to: undefined }
    }
  }
  return range
}
