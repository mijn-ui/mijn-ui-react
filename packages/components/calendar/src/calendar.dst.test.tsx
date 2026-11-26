import * as React from "react"
import { act, cleanup, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterAll, afterEach, describe, expect, it, vi } from "vitest"
import { Calendar, DateRange } from "./calendar"
import { addDays, differenceInCalendarDays, newDate, toISODate } from "./date"

/**
 * Months in which the clocks change, in zones that make that awkward: where
 * local midnight does not exist on the day (São Paulo, Santiago, Beirut),
 * where it happens twice (São Paulo, Santiago), and where the shift is half an
 * hour (Lord Howe). Adding 24 hours of milliseconds to a date skips or repeats
 * a day in each of these.
 *
 * Node applies a new `process.env.TZ` immediately.
 */
const ORIGINAL_TZ = process.env.TZ
afterEach(cleanup)
afterAll(() => {
  process.env.TZ = ORIGINAL_TZ
})

// [zone, year, month (0-based), the day the clocks change]
const TRANSITIONS: Array<[string, number, number, number]> = [
  ["America/Sao_Paulo", 2018, 10, 4], // 00:00 → 01:00
  ["America/Sao_Paulo", 2019, 1, 16], // 24:00 → 23:00
  ["America/Santiago", 2026, 8, 6], // 00:00 → 01:00
  ["America/Santiago", 2026, 3, 4], // 24:00 → 23:00
  ["Asia/Beirut", 2026, 2, 29], // 00:00 → 01:00
  ["Europe/Amsterdam", 2026, 2, 29],
  ["Europe/Amsterdam", 2026, 9, 25],
  ["America/New_York", 2026, 2, 8],
  ["Australia/Lord_Howe", 2026, 3, 5], // half an hour
]

/** Day arithmetic on ISO strings, in UTC: independent of the zone under test. */
const isoPlus = (iso: string, days: number) => {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}
const pad = (n: number) => String(n).padStart(2, "0")
const isoOf = (y: number, m: number, d: number) =>
  `${y}-${pad(m + 1)}-${pad(d)}`

const cell = (iso: string) =>
  document.querySelector<HTMLElement>(`[data-day="${iso}"]:not([data-outside])`)
const dayButton = (iso: string) => cell(iso)!.querySelector("button")!
const focusedDay = () =>
  document.activeElement?.closest("[data-day]")?.getAttribute("data-day")
const selectedDays = () =>
  Array.from(
    document.querySelectorAll('[aria-selected="true"]:not([data-outside])'),
  ).map((td) => td.getAttribute("data-day"))

describe.each(TRANSITIONS)("%s, %i-%i (day %i)", (zone, year, month, day) => {
  const iso = isoOf(year, month, day)
  const before = isoPlus(iso, -1)
  const after = isoPlus(iso, 1)

  const setup = (props: object = {}) => {
    process.env.TZ = zone
    return render(
      <Calendar
        mode="single"
        defaultMonth={newDate(year, month, 1)}
        today={newDate(year, month, 1)}
        fixedWeeks
        {...props}
      />,
    )
  }

  it("is really a transition month in this zone", () => {
    process.env.TZ = zone
    const start = new Date(year, month, day)
    const end = new Date(year, month, day + 1)
    const hours = (end.getTime() - start.getTime()) / 3_600_000
    expect(hours === 24 && start.getHours() === 0).toBe(false)
  })

  it("adds days without skipping or repeating one, all year", () => {
    process.env.TZ = zone
    let date = newDate(year, 0, 1)
    const seen = new Set<string>()
    for (let i = 0; i < 366; i++) {
      const next = addDays(date, 1)
      expect(differenceInCalendarDays(next, date)).toBe(1)
      expect(toISODate(next)).toBe(isoPlus(toISODate(date), 1))
      seen.add(toISODate(date))
      date = next
    }
    expect(seen.size).toBe(366)
  })

  it("draws every day once, in order, in its weekday's column", () => {
    setup()
    const days = Array.from(document.querySelectorAll("td")).map(
      (td) => td.getAttribute("data-day")!,
    )
    expect(days).toHaveLength(42)
    days.slice(1).forEach((iso, i) => expect(iso).toBe(isoPlus(days[i], 1)))

    const inMonth = Array.from(
      document.querySelectorAll("td:not([data-outside])"),
    ).map((td) => td.getAttribute("data-day"))
    const length = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    expect(inMonth).toEqual(
      Array.from({ length }, (_, i) => isoOf(year, month, i + 1)),
    )

    const td = cell(iso)!
    const column = Array.from(td.parentElement!.children).indexOf(td)
    expect(column).toBe(new Date(Date.UTC(year, month, day)).getUTCDay())
  })

  it("names the day by its own date", () => {
    setup()
    const label = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(year, month, day)))
    expect(dayButton(iso).getAttribute("aria-label")).toBe(label)
    expect(dayButton(iso).textContent).toBe(String(day))
  })

  it("moves focus across the change one day at a time", async () => {
    const user = userEvent.setup()
    setup()
    act(() => dayButton(before).focus())
    await user.keyboard("{ArrowRight}")
    expect(focusedDay()).toBe(iso)
    await user.keyboard("{ArrowRight}")
    expect(focusedDay()).toBe(after)
    await user.keyboard("{ArrowLeft}{ArrowLeft}")
    expect(focusedDay()).toBe(before)
    await user.keyboard("{ArrowDown}{ArrowUp}")
    expect(focusedDay()).toBe(before)
  })

  it("selects the day it is given and the day that is clicked", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    // Noon on the day, so a midnight that does not exist cannot matter.
    setup({ selected: new Date(year, month, day, 12), onSelect })
    expect(cell(iso)!.getAttribute("aria-selected")).toBe("true")
    await user.click(dayButton(after))
    expect(toISODate(onSelect.mock.calls[0][0])).toBe(after)
  })

  it("counts the nights of a range across the change", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const Range = () => {
      const [range, setRange] = React.useState<DateRange>()
      return (
        <Calendar
          mode="range"
          defaultMonth={newDate(year, month, 1)}
          max={1}
          selected={range}
          onSelect={(next) => {
            setRange(next)
            onSelect(next)
          }}
        />
      )
    }
    process.env.TZ = zone
    render(<Range />)
    await user.click(dayButton(before))
    await user.click(dayButton(iso))
    expect(selectedDays()).toEqual([before, iso])
    // Two nights is more than `max={1}`: the range restarts.
    await user.click(dayButton(after))
    expect(selectedDays()).toEqual([after])
    expect(onSelect.mock.lastCall![0].from.getDate()).toBe(
      Number(after.slice(8)),
    )
  })
})
