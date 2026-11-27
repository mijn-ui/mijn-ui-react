import { describe, expect, it } from "vitest"
import {
  DateRange,
  Matcher,
  addMonths,
  addToRange,
  differenceInCalendarDays,
  isMatch,
  newDate,
  rangeIncludesDate,
  startOfWeek,
  toDay,
  toISODate,
} from "./date"

const d = (iso: string) => {
  const [y, m, day] = iso.split("-").map(Number)
  return newDate(y, m - 1, day)
}
const iso = (date: Date | undefined) => (date ? toISODate(date) : undefined)
const range = (value: DateRange | undefined) =>
  value && { from: iso(value.from), to: iso(value.to) }

describe("date helpers", () => {
  it("builds years below 100 as written, not as 19xx", () => {
    expect(newDate(42, 0, 1).getFullYear()).toBe(42)
  })

  it("strips the time of day", () => {
    const day = toDay(new Date(2026, 10, 26, 23, 59, 59, 999))!
    expect([day.getHours(), day.getMinutes(), iso(day)]).toEqual([
      0,
      0,
      "2026-11-26",
    ])
    expect(toDay(new Date(Number.NaN))).toBeUndefined()
  })

  it("keeps the day inside the month when moving by months", () => {
    expect(iso(addMonths(d("2026-01-31"), 1))).toBe("2026-02-28")
    expect(iso(addMonths(d("2024-03-31"), -1))).toBe("2024-02-29")
    expect(iso(addMonths(d("2026-11-15"), -11))).toBe("2025-12-15")
  })

  it("starts the week on the given day", () => {
    // 2026-11-26 is a Thursday.
    expect(iso(startOfWeek(d("2026-11-26"), 0))).toBe("2026-11-22")
    expect(iso(startOfWeek(d("2026-11-26"), 1))).toBe("2026-11-23")
    expect(iso(startOfWeek(d("2026-11-26"), 4))).toBe("2026-11-26")
    expect(iso(startOfWeek(d("2026-11-26"), 5))).toBe("2026-11-20")
  })

  it("counts calendar days, ignoring the time of day", () => {
    expect(
      differenceInCalendarDays(
        new Date(2026, 10, 27, 0, 1),
        new Date(2026, 10, 26, 23, 59),
      ),
    ).toBe(1)
    expect(differenceInCalendarDays(d("2026-01-01"), d("2025-01-01"))).toBe(365)
  })
})

describe("isMatch", () => {
  const thu = d("2026-11-26")
  const cases: Array<[string, Matcher | Matcher[], boolean]> = [
    ["true", true, true],
    ["false", false, false],
    ["the same day, at another time", new Date(2026, 10, 26, 18), true],
    ["another day", d("2026-11-25"), false],
    ["a Date[] holding it", [d("2026-11-01"), new Date(2026, 10, 26, 9)], true],
    ["a Date[] without it", [d("2026-11-01"), d("2026-11-27")], false],
    ["a nested Date[]", [false, [d("2026-11-26")]], true],
    ["a range around it", { from: d("2026-11-20"), to: d("2026-11-30") }, true],
    ["a range starting on it", { from: thu, to: d("2026-11-30") }, true],
    ["a range ending on it", { from: d("2026-11-01"), to: thu }, true],
    ["an inverted range", { from: d("2026-11-30"), to: d("2026-11-20") }, true],
    [
      "a range before it",
      { from: d("2026-11-01"), to: d("2026-11-25") },
      false,
    ],
    ["a range with only `from` on it", { from: thu }, true],
    ["a range with only `from` before", { from: d("2026-11-25") }, false],
    ["{ before } a later day", { before: d("2026-11-27") }, true],
    ["{ before } the day itself", { before: thu }, false],
    ["{ after } an earlier day", { after: d("2026-11-25") }, true],
    ["{ after } the day itself", { after: thu }, false],
    [
      "{ before, after } around it",
      { after: d("2026-11-20"), before: d("2026-11-30") },
      true,
    ],
    [
      "{ before, after } with it on an edge",
      { after: thu, before: d("2026-11-30") },
      false,
    ],
    [
      "{ before, after } inverted, with it inside",
      { before: d("2026-11-20"), after: d("2026-11-30") },
      false,
    ],
    [
      "{ before, after } inverted, with it outside",
      { before: d("2026-11-27"), after: d("2026-12-30") },
      true,
    ],
    ["{ dayOfWeek: [4] }", { dayOfWeek: [4] }, true],
    ["{ dayOfWeek: [0, 6] }", { dayOfWeek: [0, 6] }, false],
    ["{ dayOfWeek: 4 }", { dayOfWeek: 4 }, true],
    ["a function", (date: Date) => date.getDate() === 26, true],
    ["a function returning false", () => false, false],
    ["a list where one matches", [false, { dayOfWeek: [4] }], true],
    ["an empty list", [], false],
  ]

  it.each(cases)("%s", (_, matcher, expected) => {
    expect(isMatch(thu, matcher)).toBe(expected)
  })

  it("matches nothing without matchers", () => {
    expect(isMatch(thu, undefined)).toBe(false)
  })
})

describe("rangeIncludesDate", () => {
  it("excludes the ends when asked", () => {
    const r = { from: d("2026-11-10"), to: d("2026-11-12") }
    expect(rangeIncludesDate(r, d("2026-11-10"), true)).toBe(false)
    expect(rangeIncludesDate(r, d("2026-11-11"), true)).toBe(true)
    expect(
      rangeIncludesDate({ from: d("2026-11-10") }, d("2026-11-10"), true),
    ).toBe(false)
  })
})

/**
 * Every branch of react-day-picker 9.11's `addToRange`, so range clicks behave
 * exactly as they did before the calendar dropped it.
 */
describe("addToRange", () => {
  const add = (
    date: string,
    initial: { from?: string; to?: string } | undefined,
    min = 0,
    max = 0,
    required = false,
  ) =>
    range(
      addToRange(
        d(date),
        initial && {
          from: initial.from ? d(initial.from) : undefined,
          to: initial.to ? d(initial.to) : undefined,
        },
        min,
        max,
        required,
      ),
    )

  it("starts an empty range on the day, closed", () => {
    expect(add("2026-11-10", undefined)).toEqual({
      from: "2026-11-10",
      to: "2026-11-10",
    })
    expect(add("2026-11-10", { from: undefined, to: undefined })).toEqual({
      from: "2026-11-10",
      to: "2026-11-10",
    })
  })

  it("starts an empty range open when there is a minimum", () => {
    expect(add("2026-11-10", undefined, 1)).toEqual({
      from: "2026-11-10",
      to: undefined,
    })
  })

  describe("with only `from`", () => {
    it("closes on the same day", () => {
      expect(add("2026-11-10", { from: "2026-11-10" })).toEqual({
        from: "2026-11-10",
        to: "2026-11-10",
      })
    })
    it("clears on the same day when there is a minimum", () => {
      expect(add("2026-11-10", { from: "2026-11-10" }, 2)).toBeUndefined()
    })
    it("stays open on the same day when there is a minimum and it is required", () => {
      expect(add("2026-11-10", { from: "2026-11-10" }, 2, 0, true)).toEqual({
        from: "2026-11-10",
        to: undefined,
      })
    })
    it("ends at a later day", () => {
      expect(add("2026-11-15", { from: "2026-11-10" })).toEqual({
        from: "2026-11-10",
        to: "2026-11-15",
      })
    })
    it("swaps around an earlier day", () => {
      expect(add("2026-11-05", { from: "2026-11-10" })).toEqual({
        from: "2026-11-05",
        to: "2026-11-10",
      })
    })
  })

  describe("with a complete range", () => {
    const full = { from: "2026-11-10", to: "2026-11-15" }

    it("clears a one-day range clicked again", () => {
      expect(
        add("2026-11-10", { from: "2026-11-10", to: "2026-11-10" }),
      ).toBeUndefined()
    })
    it("keeps a one-day range clicked again when required", () => {
      expect(
        add("2026-11-10", { from: "2026-11-10", to: "2026-11-10" }, 0, 0, true),
      ).toEqual({ from: "2026-11-10", to: "2026-11-10" })
    })
    it("collapses onto `from` when it is clicked", () => {
      expect(add("2026-11-10", full)).toEqual({
        from: "2026-11-10",
        to: "2026-11-10",
      })
      expect(add("2026-11-10", full, 1)).toEqual({
        from: "2026-11-10",
        to: undefined,
      })
    })
    it("collapses onto `to` when it is clicked", () => {
      expect(add("2026-11-15", full)).toEqual({
        from: "2026-11-15",
        to: "2026-11-15",
      })
      expect(add("2026-11-15", full, 1)).toEqual({
        from: "2026-11-15",
        to: undefined,
      })
    })
    it("moves `from` to an earlier day", () => {
      expect(add("2026-11-01", full)).toEqual({
        from: "2026-11-01",
        to: "2026-11-15",
      })
    })
    it("moves `to` to a day inside", () => {
      expect(add("2026-11-12", full)).toEqual({
        from: "2026-11-10",
        to: "2026-11-12",
      })
    })
    it("moves `to` to a later day", () => {
      expect(add("2026-11-20", full)).toEqual({
        from: "2026-11-10",
        to: "2026-11-20",
      })
    })
  })

  it("clears a range with only `to`, as react-day-picker does", () => {
    expect(add("2026-11-10", { to: "2026-11-15" })).toBeUndefined()
  })

  describe("min and max count the nights between the ends", () => {
    it("restarts a range longer than max", () => {
      // 10th → 17th is 7 nights.
      expect(add("2026-11-17", { from: "2026-11-10" }, 0, 6)).toEqual({
        from: "2026-11-17",
        to: undefined,
      })
      expect(add("2026-11-16", { from: "2026-11-10" }, 0, 6)).toEqual({
        from: "2026-11-10",
        to: "2026-11-16",
      })
    })
    it("restarts a range shorter than min", () => {
      expect(add("2026-11-11", { from: "2026-11-10" }, 3)).toEqual({
        from: "2026-11-11",
        to: undefined,
      })
      expect(add("2026-11-13", { from: "2026-11-10" }, 3)).toEqual({
        from: "2026-11-10",
        to: "2026-11-13",
      })
    })
    it("does not apply a min of 1 to a one-day range", () => {
      expect(add("2026-11-10", { from: "2026-11-10" }, 1)).toBeUndefined()
      expect(add("2026-11-11", { from: "2026-11-10" }, 1)).toEqual({
        from: "2026-11-10",
        to: "2026-11-11",
      })
    })
  })
})
