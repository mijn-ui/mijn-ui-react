import * as React from "react"
import { act, cleanup, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  Calendar,
  CalendarProps,
  DateRange,
  Matcher,
  calendarStyles,
} from "./calendar"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

/** A Thursday. */
const TODAY = new Date(2026, 10, 26)
const NOVEMBER = new Date(2026, 10, 1)

const renderCalendar = (props: Partial<CalendarProps> = {}) =>
  render(
    <Calendar
      today={TODAY}
      defaultMonth={NOVEMBER}
      {...(props as CalendarProps)}
    />,
  )

/** The cell of a day in its own month's grid (not an outside copy). */
const cell = (iso: string) =>
  document.querySelector<HTMLElement>(`[data-day="${iso}"]:not([data-outside])`)
const dayButton = (iso: string) =>
  cell(iso)?.querySelector<HTMLButtonElement>("button") ?? null
const focusedDay = () =>
  document.activeElement?.closest("[data-day]")?.getAttribute("data-day")
const focusedIsOutside = () =>
  document.activeElement?.closest("[data-day]")?.hasAttribute("data-outside")
const captions = () =>
  screen
    .getAllByRole("grid")
    .map(
      (grid) =>
        document.getElementById(grid.getAttribute("aria-labelledby")!)
          ?.textContent,
    )
const selectedDays = () =>
  Array.from(document.querySelectorAll('[aria-selected="true"]')).map((td) =>
    td.getAttribute("data-day"),
  )
const tabStops = () =>
  Array.from(
    document.querySelectorAll(
      '[data-slot="calendar-day-button"][tabindex="0"]',
    ),
  ).map((button) => button.closest("td")?.getAttribute("data-day"))
const disabledDays = () =>
  Array.from(
    document.querySelectorAll("[data-disabled]:not([data-outside])"),
  ).map((td) => td.getAttribute("data-day"))
const focus = (iso: string) => act(() => dayButton(iso)!.focus())
const iso = (date: Date | undefined) =>
  date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : undefined

/* -------------------------------------------------------------------------- */

describe("Calendar styles", () => {
  it("only uses classes the theme can compile", async () => {
    // 0.7 shipped `focus:!bg-bg-brandfocus:!text-on-bg-brand` — two classes
    // fused by a missing space, which compiles to nothing.
    const slots = Object.values(calendarStyles()) as Array<() => string>
    const all = slots.map((slot) => slot())
    // Hooks for the `[&:has(...)]` selectors and for app styles, CSS-less on
    // purpose.
    const markers = ["day-outside", "day-range-start", "day-range-end"]
    expect(await unknownClasses(all, markers)).toEqual([])
  })

  it("keeps the selected day in brand colours while it has focus", () => {
    renderCalendar({ mode: "single", selected: new Date(2026, 10, 12) })
    const selected = cell("2026-11-12")
    expect(selected?.getAttribute("aria-selected")).toBe("true")

    const classes = selected?.className.split(" ") ?? []
    expect(classes).toContain("focus-within:bg-bg-brand!")
    expect(classes).toContain("focus-within:text-on-bg-brand!")
    expect(selected?.className).not.toContain("brandfocus")
  })

  it("draws the focus ring on the day whose button has keyboard focus", () => {
    renderCalendar({ mode: "single" })
    const day = cell("2026-11-12")
    // Focus lands on the button inside the cell, so the cell has to ask
    // `:has(:focus-visible)` — a plain `focus-visible:` on it never matches.
    expect(day?.querySelector("button")).not.toBeNull()
    expect(day?.className).toContain("has-focus-visible:mijn-focus-ring")
    expect(day?.className).toContain("has-focus-visible:ring-outline-brand")
    expect(day?.className).not.toMatch(/(^|\s)focus-visible:/)
  })

  it("puts each state's slot on the day cell", () => {
    renderCalendar({
      mode: "range",
      selected: { from: new Date(2026, 10, 10), to: new Date(2026, 10, 12) },
      disabled: new Date(2026, 10, 20),
      hidden: new Date(2026, 10, 21),
    })
    const has = (iso: string, slot: keyof ReturnType<typeof calendarStyles>) =>
      cell(iso)!.className.includes(calendarStyles()[slot]()!.split(" ")[0])
    expect(has("2026-11-26", "today")).toBe(true)
    expect(has("2026-11-20", "disabled")).toBe(true)
    expect(has("2026-11-21", "hidden")).toBe(true)
    expect(has("2026-11-10", "range_start")).toBe(true)
    expect(has("2026-11-11", "range_middle")).toBe(true)
    expect(has("2026-11-12", "range_end")).toBe(true)
    expect(has("2026-11-11", "selected")).toBe(true)
    const outside = document.querySelector('[data-day="2026-12-01"]')!
    expect(outside.hasAttribute("data-outside")).toBe(true)
    expect(outside.className).toContain("day-outside")
  })

  it("drops default classes when unstyled", () => {
    renderCalendar({
      unstyled: true,
      mode: "single",
      selected: new Date(2026, 10, 12),
    })
    const day = cell("2026-11-12")
    expect(day?.className ?? "").not.toContain("bg-bg-brand")
    expect(dayButton("2026-11-12")!.hasAttribute("class")).toBe(false)
  })

  it("uses only `classNames` when unstyled", () => {
    renderCalendar({
      unstyled: true,
      mode: "single",
      selected: new Date(2026, 10, 12),
      className: "my-root",
      classNames: { day: "my-day", selected: "my-selected", today: "my-today" },
    })
    expect(document.querySelector('[data-slot="calendar"]')!.className).toBe(
      "my-root",
    )
    expect(cell("2026-11-12")!.className).toBe("my-day my-selected")
    expect(cell("2026-11-26")!.className).toBe("my-day my-today")
  })

  it("merges `classNames` and `className` into the default slot classes", () => {
    renderCalendar({
      mode: "single",
      className: "rounded-lg border",
      classNames: {
        day_button: "size-10",
        month_caption: "h-10",
        button_next: "rounded-full",
      },
    })
    const root = document.querySelector('[data-slot="calendar"]')!
    expect(root.className).toContain("bg-bg-default")
    expect(root.className).toContain("rounded-lg border")

    const button = dayButton("2026-11-12")!.className.split(" ")
    expect(button).toContain("size-10")
    expect(button).not.toContain("size-8")
    expect(button).toContain("text-center")

    const caption = document.querySelector('[data-slot="calendar-caption"]')!
    expect(caption.className.split(" ")).toEqual(
      expect.arrayContaining(["h-10", "justify-center"]),
    )
    expect(caption.className.split(" ")).not.toContain("h-8")
    const next = screen.getByRole("button", { name: "Go to the Next Month" })
    expect(next.className).toContain("rounded-full")
    expect(next.className.split(" ")).not.toContain("rounded-md")
  })
})

/* -------------------------------------------------------------------------- */

describe("Calendar structure", () => {
  it("passes root props through", () => {
    const ref = React.createRef<HTMLDivElement>()
    renderCalendar({
      id: "cal",
      "aria-label": "Due date",
      ...({ "data-testid": "x" } as object),
      ref,
    })
    const root = screen.getByTestId("x")
    expect(root.getAttribute("data-slot")).toBe("calendar")
    expect(root.id).toBe("cal")
    expect(root.getAttribute("aria-label")).toBe("Due date")
    expect(ref.current).toBe(root)
  })

  it("labels each month's grid with its caption, a polite live region", () => {
    renderCalendar({ mode: "single", numberOfMonths: 2 })
    const grids = screen.getAllByRole("grid")
    expect(grids).toHaveLength(2)
    expect(
      grids.map((grid) => grid.getAttribute("aria-multiselectable")),
    ).toEqual([null, null])
    expect(screen.getByRole("grid", { name: "November 2026" })).toBe(grids[0])
    expect(screen.getByRole("grid", { name: "December 2026" })).toBe(grids[1])
    const caption = document.getElementById(
      grids[0].getAttribute("aria-labelledby")!,
    )!
    expect(caption.getAttribute("aria-live")).toBe("polite")
  })

  it("lays days out in rows of gridcells", () => {
    renderCalendar({ mode: "single" })
    const grid = screen.getByRole("grid")
    // Five weeks: November 2026 starts on a Sunday. The weekday header is
    // aria-hidden — each day's name already says its weekday.
    expect(within(grid).getAllByRole("row")).toHaveLength(5)
    expect(within(grid).getAllByRole("gridcell")).toHaveLength(35)
    expect(
      within(grid)
        .getAllByRole("gridcell")
        .every((td) => td.getAttribute("aria-selected") === "false"),
    ).toBe(true)
  })

  it("names each day button with its full date and marks today", () => {
    renderCalendar({ mode: "single" })
    const today = screen.getByRole("button", {
      name: "Thursday, November 26, 2026",
    })
    expect(today.getAttribute("aria-current")).toBe("date")
    expect(today.textContent).toBe("26")
    expect(document.querySelectorAll('[aria-current="date"]')).toHaveLength(1)
  })

  it("heads the columns with short weekday names", () => {
    const { unmount } = renderCalendar()
    const names = () =>
      Array.from(document.querySelectorAll("th")).map((th) => th.textContent)
    expect(names()).toEqual(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
    expect(document.querySelector("th")!.getAttribute("aria-label")).toBe(
      "Sunday",
    )
    unmount()
    renderCalendar({ weekStartsOn: 1 })
    expect(names()).toEqual(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
    expect(document.querySelector("td")!.getAttribute("data-day")).toBe(
      "2026-10-26",
    )
  })

  it("marks multiple and range grids as multiselectable", () => {
    const { unmount } = renderCalendar({ mode: "multiple" })
    expect(screen.getByRole("grid").getAttribute("aria-multiselectable")).toBe(
      "true",
    )
    unmount()
    renderCalendar({ mode: "range" })
    expect(screen.getByRole("grid").getAttribute("aria-multiselectable")).toBe(
      "true",
    )
  })

  it("only shows dates without a mode", () => {
    renderCalendar()
    expect(
      document.querySelectorAll('[data-slot="calendar-day-button"]'),
    ).toHaveLength(0)
    expect(
      screen.getByRole("gridcell", { name: "Thursday, November 26, 2026" })
        .textContent,
    ).toBe("26")
    expect(cell("2026-11-26")!.hasAttribute("aria-selected")).toBe(false)
  })
})

/* -------------------------------------------------------------------------- */

describe("Calendar single mode", () => {
  it("selects a day, and clears it when clicked again", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single" })
    await user.click(dayButton("2026-11-12")!)
    expect(selectedDays()).toEqual(["2026-11-12"])
    await user.click(dayButton("2026-11-13")!)
    expect(selectedDays()).toEqual(["2026-11-13"])
    await user.click(dayButton("2026-11-13")!)
    expect(selectedDays()).toEqual([])
  })

  it("keeps the selection when `required`", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", required: true, selected: undefined })
    await user.click(dayButton("2026-11-12")!)
    await user.click(dayButton("2026-11-12")!)
    expect(selectedDays()).toEqual(["2026-11-12"])
  })

  it("calls onSelect with the new value, the day, its modifiers and the event", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderCalendar({ mode: "single", onSelect })
    await user.click(dayButton("2026-11-26")!)
    const [selected, day, modifiers, event] = onSelect.mock.calls[0]
    expect(iso(selected)).toBe("2026-11-26")
    expect(iso(day)).toBe("2026-11-26")
    expect(modifiers).toMatchObject({ today: true, selected: false })
    expect(event.type).toBe("click")
  })

  it("is controlled when `onSelect` is passed", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderCalendar({
      mode: "single",
      selected: new Date(2026, 10, 5),
      onSelect,
    })
    await user.click(dayButton("2026-11-12")!)
    expect(iso(onSelect.mock.calls[0][0])).toBe("2026-11-12")
    // The parent did not store it.
    expect(selectedDays()).toEqual(["2026-11-05"])
  })

  it("treats `selected` without `onSelect` as the initial selection", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", selected: new Date(2026, 10, 5) })
    expect(selectedDays()).toEqual(["2026-11-05"])
    await user.click(dayButton("2026-11-12")!)
    expect(selectedDays()).toEqual(["2026-11-12"])
  })

  it("ignores the time of day of the dates it is given", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderCalendar({
      mode: "single",
      selected: new Date(2026, 10, 12, 23, 30),
      onSelect,
    })
    expect(selectedDays()).toEqual(["2026-11-12"])
    await user.click(dayButton("2026-11-13")!)
    const date: Date = onSelect.mock.calls[0][0]
    expect([date.getHours(), date.getMinutes(), iso(date)]).toEqual([
      0,
      0,
      "2026-11-13",
    ])
  })
})

describe("Calendar multiple mode", () => {
  const Multiple = (props: {
    min?: number
    max?: number
    required?: boolean
  }) => {
    const [dates, setDates] = React.useState<Date[] | undefined>([
      new Date(2026, 10, 2),
      new Date(2026, 10, 3),
    ])
    return (
      <Calendar
        mode="multiple"
        today={TODAY}
        defaultMonth={NOVEMBER}
        {...(props as { required?: false })}
        selected={dates}
        onSelect={setDates}
      />
    )
  }

  it("adds and removes days", async () => {
    const user = userEvent.setup()
    render(<Multiple />)
    await user.click(dayButton("2026-11-10")!)
    expect(selectedDays()).toEqual(["2026-11-02", "2026-11-03", "2026-11-10"])
    await user.click(dayButton("2026-11-02")!)
    expect(selectedDays()).toEqual(["2026-11-03", "2026-11-10"])
  })

  it("keeps at least `min` days", async () => {
    const user = userEvent.setup()
    render(<Multiple min={2} />)
    await user.click(dayButton("2026-11-02")!)
    expect(selectedDays()).toEqual(["2026-11-02", "2026-11-03"])
  })

  it("starts again from the clicked day past `max`", async () => {
    const user = userEvent.setup()
    render(<Multiple max={2} />)
    await user.click(dayButton("2026-11-10")!)
    expect(selectedDays()).toEqual(["2026-11-10"])
  })

  it("keeps the last day when `required`", async () => {
    const user = userEvent.setup()
    render(<Multiple required />)
    await user.click(dayButton("2026-11-02")!)
    await user.click(dayButton("2026-11-03")!)
    expect(selectedDays()).toEqual(["2026-11-03"])
  })
})

describe("Calendar range mode", () => {
  const Range = (props: {
    min?: number
    max?: number
    required?: boolean
    initial?: DateRange
    numberOfMonths?: number
    onSelect?: (range: DateRange | undefined) => void
  }) => {
    const [range, setRange] = React.useState<DateRange | undefined>(
      props.initial,
    )
    return (
      <Calendar
        mode="range"
        today={TODAY}
        defaultMonth={NOVEMBER}
        numberOfMonths={props.numberOfMonths}
        min={props.min}
        max={props.max}
        {...((props.required ? { required: true } : {}) as {
          required?: false
        })}
        selected={range}
        onSelect={(next) => {
          setRange(next)
          props.onSelect?.(next)
        }}
      />
    )
  }
  const span = (from: number, to: number) =>
    Array.from(
      { length: to - from + 1 },
      (_, i) => `2026-11-${String(from + i).padStart(2, "0")}`,
    )

  it("selects from the first click to the second", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Range onSelect={onSelect} />)
    await user.click(dayButton("2026-11-10")!)
    expect(onSelect.mock.calls[0][0]).toEqual({
      from: new Date(2026, 10, 10),
      to: new Date(2026, 10, 10),
    })
    await user.click(dayButton("2026-11-17")!)
    expect(selectedDays()).toEqual(span(10, 17))
    expect(cell("2026-11-10")!.className).toContain("day-range-start")
    expect(cell("2026-11-17")!.className).toContain("day-range-end")
    expect(cell("2026-11-13")!.className).toContain(
      "aria-selected:bg-bg-secondary/75",
    )
    expect(cell("2026-11-10")!.className).not.toContain(
      "aria-selected:bg-bg-secondary/75",
    )
  })

  it("moves the nearer end", async () => {
    const user = userEvent.setup()
    render(
      <Range
        initial={{ from: new Date(2026, 10, 10), to: new Date(2026, 10, 17) }}
      />,
    )
    await user.click(dayButton("2026-11-05")!)
    expect(selectedDays()).toEqual(span(5, 17))
    await user.click(dayButton("2026-11-08")!)
    expect(selectedDays()).toEqual(span(5, 8))
  })

  it("clears a one-day range clicked again, unless required", async () => {
    const user = userEvent.setup()
    const { unmount } = render(<Range />)
    await user.click(dayButton("2026-11-10")!)
    await user.click(dayButton("2026-11-10")!)
    expect(selectedDays()).toEqual([])
    unmount()

    render(<Range required />)
    await user.click(dayButton("2026-11-10")!)
    await user.click(dayButton("2026-11-10")!)
    expect(selectedDays()).toEqual(["2026-11-10"])
  })

  it("restarts a range longer than `max` nights", async () => {
    const user = userEvent.setup()
    render(<Range max={6} />)
    await user.click(dayButton("2026-11-10")!)
    await user.click(dayButton("2026-11-17")!)
    expect(selectedDays()).toEqual(["2026-11-17"])
    await user.click(dayButton("2026-11-23")!)
    expect(selectedDays()).toEqual(span(17, 23))
  })

  it("leaves the range open below `min` nights", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Range min={3} onSelect={onSelect} />)
    await user.click(dayButton("2026-11-10")!)
    expect(onSelect.mock.lastCall![0]).toEqual({
      from: new Date(2026, 10, 10),
      to: undefined,
    })
    await user.click(dayButton("2026-11-11")!)
    expect(onSelect.mock.lastCall![0]).toEqual({
      from: new Date(2026, 10, 11),
      to: undefined,
    })
    await user.click(dayButton("2026-11-14")!)
    expect(selectedDays()).toEqual(span(11, 14))
  })

  it("spans months, outside days included", async () => {
    const user = userEvent.setup()
    render(<Range numberOfMonths={2} />)
    await user.click(dayButton("2026-11-28")!)
    await user.click(dayButton("2026-12-02")!)
    const outsideCopy = document.querySelector(
      '[data-day="2026-12-01"][data-outside]',
    )!
    expect(outsideCopy.getAttribute("aria-selected")).toBe("true")
    expect(cell("2026-12-01")!.getAttribute("aria-selected")).toBe("true")
  })
})

/* -------------------------------------------------------------------------- */

describe("Calendar disabled and hidden days", () => {
  const cases: Array<[string, Matcher | Matcher[], string[]]> = [
    ["true", true, ["all"]],
    ["a Date", new Date(2026, 10, 12, 14), ["2026-11-12"]],
    [
      "a Date[]",
      [new Date(2026, 10, 3), new Date(2026, 10, 9)],
      ["2026-11-03", "2026-11-09"],
    ],
    [
      "{ from, to }",
      { from: new Date(2026, 10, 28), to: new Date(2026, 10, 30) },
      ["2026-11-28", "2026-11-29", "2026-11-30"],
    ],
    [
      "{ before }",
      { before: new Date(2026, 10, 3) },
      ["2026-11-01", "2026-11-02"],
    ],
    ["{ after }", { after: new Date(2026, 10, 29) }, ["2026-11-30"]],
    [
      "{ before, after }",
      { after: new Date(2026, 10, 2), before: new Date(2026, 10, 29) },
      [],
    ],
    [
      "{ dayOfWeek }",
      { dayOfWeek: [0] },
      ["2026-11-01", "2026-11-08", "2026-11-15", "2026-11-22", "2026-11-29"],
    ],
    [
      "a function",
      (date: Date) => date.getDate() % 10 === 0,
      ["2026-11-10", "2026-11-20", "2026-11-30"],
    ],
    [
      "a list of matchers",
      [new Date(2026, 10, 4), { after: new Date(2026, 10, 29) }],
      ["2026-11-04", "2026-11-30"],
    ],
  ]

  it.each(cases)("disables days matching %s", (_, disabled, expected) => {
    renderCalendar({ mode: "single", disabled })
    const days = disabledDays()
    if (expected[0] === "all") expect(days).toHaveLength(30)
    else if (expected.length) expect(days).toEqual(expected)
    else {
      // { after: Nov 2, before: Nov 29 } is Nov 3–28.
      expect(days).toHaveLength(26)
      expect(days[0]).toBe("2026-11-03")
      expect(days.at(-1)).toBe("2026-11-28")
    }
    for (const iso of days) expect(dayButton(iso!)!.disabled).toBe(true)
  })

  it("never selects a disabled day", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderCalendar({
      mode: "single",
      disabled: { dayOfWeek: [0, 6] },
      onSelect,
    })
    await user.click(dayButton("2026-11-28")!)
    expect(onSelect).not.toHaveBeenCalled()
    expect(dayButton("2026-11-27")!.disabled).toBe(false)
  })

  it("leaves hidden days blank, with the same matchers", () => {
    renderCalendar({
      mode: "single",
      hidden: [{ dayOfWeek: [6] }, new Date(2026, 10, 2)],
    })
    for (const iso of ["2026-11-07", "2026-11-28", "2026-11-02"]) {
      expect(cell(iso)!.hasAttribute("data-hidden")).toBe(true)
      expect(cell(iso)!.textContent).toBe("")
      expect(cell(iso)!.className).toContain("invisible")
      // An empty cell would collapse and shift the rest of its week; a
      // placeholder the size of a day button holds its column.
      const placeholder = cell(iso)!.firstElementChild!
      expect(placeholder.tagName).toBe("SPAN")
      expect(placeholder.getAttribute("aria-hidden")).toBe("true")
      expect(placeholder.className).toContain("size-8")
    }
    expect(dayButton("2026-11-03")).not.toBeNull()
  })

  it("sizes the cells of a calendar without a mode like day buttons", () => {
    renderCalendar()
    const number = cell("2026-11-26")!.firstElementChild!
    expect(number.textContent).toBe("26")
    expect(number.className.split(" ")).toEqual(
      expect.arrayContaining(["size-8", "inline-flex", "items-center"]),
    )
  })
})

/* -------------------------------------------------------------------------- */

describe("Calendar months", () => {
  const previous = () =>
    screen.getByRole("button", { name: "Go to the Previous Month" })
  const next = () =>
    screen.getByRole("button", { name: "Go to the Next Month" })

  it("starts at today's month by default", () => {
    render(<Calendar today={TODAY} />)
    expect(captions()).toEqual(["November 2026"])
  })

  it("moves between months and reports the new first month", async () => {
    const user = userEvent.setup()
    const onMonthChange = vi.fn()
    renderCalendar({ onMonthChange })
    await user.click(next())
    expect(captions()).toEqual(["December 2026"])
    expect(iso(onMonthChange.mock.lastCall![0])).toBe("2026-12-01")
    await user.click(previous())
    await user.click(previous())
    expect(captions()).toEqual(["October 2026"])
    expect(iso(onMonthChange.mock.lastCall![0])).toBe("2026-10-01")
  })

  it("can be controlled with `month`", async () => {
    const user = userEvent.setup()
    const onMonthChange = vi.fn()
    const { rerender } = render(
      <Calendar month={new Date(2026, 10, 15)} onMonthChange={onMonthChange} />,
    )
    await user.click(next())
    expect(iso(onMonthChange.mock.lastCall![0])).toBe("2026-12-01")
    expect(captions()).toEqual(["November 2026"])
    rerender(
      <Calendar month={new Date(2027, 0, 1)} onMonthChange={onMonthChange} />,
    )
    expect(captions()).toEqual(["January 2027"])
  })

  it("stops at `startMonth` and `endMonth`", async () => {
    const user = userEvent.setup()
    const onMonthChange = vi.fn()
    renderCalendar({
      mode: "single",
      startMonth: new Date(2026, 9, 20),
      endMonth: new Date(2026, 11, 5),
      onMonthChange,
    })
    await user.click(previous())
    expect(captions()).toEqual(["October 2026"])
    expect(previous().getAttribute("aria-disabled")).toBe("true")
    expect(previous().tabIndex).toBe(-1)
    await user.click(previous())
    expect(captions()).toEqual(["October 2026"])
    // Days before the first month are hidden.
    expect(
      document
        .querySelector('[data-day="2026-09-30"]')!
        .hasAttribute("data-hidden"),
    ).toBe(true)

    await user.click(next())
    await user.click(next())
    expect(captions()).toEqual(["December 2026"])
    expect(next().getAttribute("aria-disabled")).toBe("true")
    expect(previous().hasAttribute("aria-disabled")).toBe(false)
    await user.click(next())
    expect(captions()).toEqual(["December 2026"])
    expect(onMonthChange).toHaveBeenCalledTimes(3)
    expect(
      document
        .querySelector('[data-day="2027-01-01"]')!
        .hasAttribute("data-hidden"),
    ).toBe(true)
  })

  it("keeps `defaultMonth` inside the bounds", () => {
    renderCalendar({
      defaultMonth: new Date(2030, 0, 1),
      endMonth: new Date(2027, 1, 1),
      numberOfMonths: 2,
    })
    expect(captions()).toEqual(["January 2027", "February 2027"])
    expect(next().getAttribute("aria-disabled")).toBe("true")
  })

  it("shows `numberOfMonths` months side by side", async () => {
    const user = userEvent.setup()
    renderCalendar({ numberOfMonths: 3 })
    expect(captions()).toEqual([
      "November 2026",
      "December 2026",
      "January 2027",
    ])
    await user.click(next())
    expect(captions()).toEqual([
      "December 2026",
      "January 2027",
      "February 2027",
    ])
  })

  it("shows six weeks with `fixedWeeks`", () => {
    // February 2026 starts on a Sunday and has 28 days: exactly four weeks.
    const { unmount } = renderCalendar({ defaultMonth: new Date(2026, 1, 1) })
    expect(document.querySelectorAll("tbody tr")).toHaveLength(4)
    unmount()
    renderCalendar({ defaultMonth: new Date(2026, 1, 1), fixedWeeks: true })
    expect(document.querySelectorAll("tbody tr")).toHaveLength(6)
    const days = Array.from(document.querySelectorAll("td"))
    expect(days.at(-1)!.getAttribute("data-day")).toBe("2026-03-14")
  })

  it("shows outside days by default, and hides them on request", () => {
    // December 2026 starts on a Tuesday.
    const { unmount } = renderCalendar({
      mode: "single",
      defaultMonth: new Date(2026, 11, 1),
    })
    const leading = document.querySelector('[data-day="2026-11-29"]')!
    expect(leading.hasAttribute("data-outside")).toBe(true)
    expect(leading.getAttribute("data-month")).toBe("2026-11")
    expect(leading.querySelector("button")!.textContent).toBe("29")
    expect(leading.querySelector("button")!.tabIndex).toBe(-1)
    unmount()

    renderCalendar({
      mode: "single",
      defaultMonth: new Date(2026, 11, 1),
      showOutsideDays: false,
    })
    const hidden = document.querySelector('[data-day="2026-11-29"]')!
    expect(hidden.hasAttribute("data-hidden")).toBe(true)
    expect(hidden.querySelector("button")).toBeNull()
    // Still a cell, so the first week keeps its shape.
    expect(hidden.parentElement!.children).toHaveLength(7)
  })
})

/* -------------------------------------------------------------------------- */

describe("Calendar dropdown caption", () => {
  const monthSelect = () =>
    screen.getByRole("combobox", {
      name: "Choose the Month",
    }) as HTMLSelectElement
  const yearSelect = () =>
    screen.getByRole("combobox", {
      name: "Choose the Year",
    }) as HTMLSelectElement
  const options = (select: HTMLSelectElement) =>
    Array.from(select.options).map((option) => option.textContent)

  it("picks the month and year with native selects", async () => {
    const user = userEvent.setup()
    const onMonthChange = vi.fn()
    renderCalendar({
      captionLayout: "dropdown",
      startMonth: new Date(2024, 3, 1),
      endMonth: new Date(2027, 5, 1),
      onMonthChange,
    })
    expect(monthSelect().value).toBe("10")
    expect(yearSelect().value).toBe("2026")
    expect(options(monthSelect())[0]).toBe("Jan")
    expect(options(yearSelect())).toEqual(["2024", "2025", "2026", "2027"])
    // The grid is still named by the full caption, now visually hidden.
    expect(screen.getByRole("grid", { name: "November 2026" })).toBeTruthy()

    await user.selectOptions(monthSelect(), "2")
    expect(captions()).toEqual(["March 2026"])
    expect(iso(onMonthChange.mock.lastCall![0])).toBe("2026-03-01")

    await user.selectOptions(yearSelect(), "2027")
    expect(captions()).toEqual(["March 2027"])
    const disabled = Array.from(monthSelect().options)
      .filter((option) => option.disabled)
      .map((option) => option.value)
    expect(disabled).toEqual(["6", "7", "8", "9", "10", "11"])

    // March 2024 is before `startMonth`, so it stops at April.
    await user.selectOptions(yearSelect(), "2024")
    expect(captions()).toEqual(["April 2024"])
  })

  it("defaults to the last 100 years, up to the end of this one", () => {
    renderCalendar({ captionLayout: "dropdown" })
    const years = options(yearSelect())
    expect(years[0]).toBe("1926")
    expect(years.at(-1)).toBe("2026")
    expect(
      screen
        .getByRole("button", { name: "Go to the Next Month" })
        .hasAttribute("aria-disabled"),
    ).toBe(false)
  })

  it("orders the selects as the language orders month and year", () => {
    renderCalendar({ captionLayout: "dropdown", locale: "ja-JP" })
    const selects = Array.from(document.querySelectorAll("select"))
    expect(selects.map((select) => select.dataset.slot)).toEqual([
      "calendar-year-dropdown",
      "calendar-month-dropdown",
    ])
  })
})

/* -------------------------------------------------------------------------- */

describe("Calendar locale", () => {
  it("formats in en-US by default", () => {
    renderCalendar({ mode: "single" })
    expect(captions()).toEqual(["November 2026"])
    expect(dayButton("2026-11-26")!.getAttribute("aria-label")).toBe(
      "Thursday, November 26, 2026",
    )
  })

  it("formats captions, weekdays and day names in the given language", () => {
    renderCalendar({ mode: "single", locale: "nl-NL", weekStartsOn: 1 })
    expect(captions()).toEqual(["november 2026"])
    expect(document.querySelector("th")!.textContent).toBe("ma")
    expect(document.querySelector("th")!.getAttribute("aria-label")).toBe(
      "maandag",
    )
    expect(dayButton("2026-11-26")!.getAttribute("aria-label")).toBe(
      "donderdag 26 november 2026",
    )
  })

  it("uses the language's digits, and no suffixes, for day numbers", () => {
    const { unmount } = renderCalendar({ mode: "single", locale: "ar-EG" })
    expect(dayButton("2026-11-26")!.textContent).toBe("٢٦")
    unmount()
    renderCalendar({ mode: "single", locale: "ja-JP" })
    expect(dayButton("2026-11-26")!.textContent).toBe("26")
    expect(captions()).toEqual(["2026年11月"])
  })

  it("stays Gregorian in languages with another default calendar", () => {
    renderCalendar({ locale: "th-TH" })
    expect(captions()).toEqual(["พฤศจิกายน 2026"])
  })

  it("falls back to English for an invalid language tag", () => {
    renderCalendar({ locale: "not a locale" })
    expect(captions()).toEqual(["November 2026"])
  })

  it("takes the navigation labels from `labels`", () => {
    renderCalendar({
      locale: "nl-NL",
      labels: { previousMonth: "Vorige maand", nextMonth: "Volgende maand" },
    })
    expect(screen.getByRole("button", { name: "Vorige maand" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Volgende maand" })).toBeTruthy()
  })
})

/* -------------------------------------------------------------------------- */

describe("Calendar keyboard", () => {
  it("has exactly one tab stop: today, if nothing is selected", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single" })
    expect(tabStops()).toEqual(["2026-11-26"])
    // Previous, next, then the grid.
    await user.tab()
    await user.tab()
    await user.tab()
    expect(focusedDay()).toBe("2026-11-26")
    await user.tab()
    expect(focusedDay()).toBeUndefined()
  })

  it("puts the tab stop on the selected day before today", () => {
    renderCalendar({ mode: "single", selected: new Date(2026, 10, 3) })
    expect(tabStops()).toEqual(["2026-11-03"])
  })

  it("puts the tab stop on the first enabled day without today or a selection", () => {
    renderCalendar({
      mode: "single",
      defaultMonth: new Date(2027, 0, 1),
      disabled: { before: new Date(2027, 0, 4) },
    })
    expect(tabStops()).toEqual(["2027-01-04"])
  })

  it("comes back to the day that had focus", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", selected: new Date(2026, 10, 3) })
    focus("2026-11-10")
    expect(tabStops()).toEqual(["2026-11-10"])
    await user.tab()
    expect(focusedDay()).toBeUndefined()
    expect(tabStops()).toEqual(["2026-11-10"])
  })

  const moves: Array<[string, string, string]> = [
    ["{ArrowRight}", "2026-11-26", "2026-11-27"],
    ["{ArrowLeft}", "2026-11-26", "2026-11-25"],
    ["{ArrowDown}", "2026-11-12", "2026-11-19"],
    ["{ArrowUp}", "2026-11-12", "2026-11-05"],
    ["{Home}", "2026-11-26", "2026-11-22"],
    ["{End}", "2026-11-26", "2026-11-28"],
    ["{PageDown}", "2026-11-26", "2026-12-26"],
    ["{PageUp}", "2026-11-26", "2026-10-26"],
    ["{Shift>}{PageDown}{/Shift}", "2026-11-26", "2027-11-26"],
    ["{Shift>}{PageUp}{/Shift}", "2026-11-26", "2025-11-26"],
  ]

  it.each(moves)("%s moves focus from %s to %s", async (keys, from, to) => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single" })
    focus(from)
    await user.keyboard(keys)
    expect(focusedDay()).toBe(to)
    expect(focusedIsOutside()).toBe(false)
    expect(tabStops()).toEqual([to])
    const [y, m] = to.split("-").map(Number)
    expect(captions()).toEqual([
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(y, m - 1, 1)),
    ])
  })

  it("crosses into the next month and keeps focus on the new day", async () => {
    const user = userEvent.setup()
    const onMonthChange = vi.fn()
    renderCalendar({ mode: "single", onMonthChange })
    focus("2026-11-30")
    await user.keyboard("{ArrowRight}")
    expect(captions()).toEqual(["December 2026"])
    expect(focusedDay()).toBe("2026-12-01")
    // The day in December's own grid, not November's outside copy.
    expect(focusedIsOutside()).toBe(false)
    expect(iso(onMonthChange.mock.lastCall![0])).toBe("2026-12-01")
    await user.keyboard("{ArrowLeft}")
    expect(captions()).toEqual(["November 2026"])
    expect(focusedDay()).toBe("2026-11-30")
  })

  it("keeps the day inside a shorter month", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", defaultMonth: new Date(2026, 0, 1) })
    focus("2026-01-31")
    await user.keyboard("{PageDown}")
    expect(focusedDay()).toBe("2026-02-28")
  })

  it("shows several months moved by as few months as it takes", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", numberOfMonths: 2 })
    focus("2026-12-31")
    await user.keyboard("{ArrowRight}")
    expect(captions()).toEqual(["December 2026", "January 2027"])
    expect(focusedDay()).toBe("2027-01-01")
    focus("2026-12-01")
    await user.keyboard("{ArrowUp}")
    expect(captions()).toEqual(["November 2026", "December 2026"])
    expect(focusedDay()).toBe("2026-11-24")
  })

  it("follows a controlled month into the next month", async () => {
    const user = userEvent.setup()
    const Controlled = () => {
      const [month, setMonth] = React.useState(NOVEMBER)
      return (
        <Calendar
          mode="single"
          today={TODAY}
          month={month}
          onMonthChange={setMonth}
        />
      )
    }
    render(<Controlled />)
    focus("2026-11-30")
    await user.keyboard("{ArrowDown}")
    expect(captions()).toEqual(["December 2026"])
    expect(focusedDay()).toBe("2026-12-07")
  })

  it("skips disabled days", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", disabled: { dayOfWeek: [0, 6] } })
    focus("2026-11-27")
    await user.keyboard("{ArrowRight}")
    expect(focusedDay()).toBe("2026-11-30")
    await user.keyboard("{ArrowLeft}")
    expect(focusedDay()).toBe("2026-11-27")
    await user.keyboard("{Home}")
    expect(focusedDay()).toBe("2026-11-23")
    await user.keyboard("{End}")
    expect(focusedDay()).toBe("2026-11-27")
  })

  it("skips hidden days", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", hidden: new Date(2026, 10, 19) })
    focus("2026-11-12")
    await user.keyboard("{ArrowDown}")
    expect(focusedDay()).toBe("2026-11-26")
  })

  it("does not leave `startMonth` and `endMonth`", async () => {
    const user = userEvent.setup()
    renderCalendar({
      mode: "single",
      startMonth: NOVEMBER,
      endMonth: NOVEMBER,
    })
    focus("2026-11-03")
    await user.keyboard("{ArrowUp}")
    expect(focusedDay()).toBe("2026-11-01")
    await user.keyboard("{PageUp}")
    expect(focusedDay()).toBe("2026-11-01")
    focus("2026-11-26")
    await user.keyboard("{PageDown}")
    expect(focusedDay()).toBe("2026-11-30")
    expect(captions()).toEqual(["November 2026"])
  })

  it("selects with Enter and Space", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "multiple" })
    focus("2026-11-10")
    await user.keyboard("{Enter}")
    await user.keyboard("{ArrowRight}")
    await user.keyboard(" ")
    expect(selectedDays()).toEqual(["2026-11-10", "2026-11-11"])
  })

  it("swaps left and right in a right-to-left calendar", async () => {
    const user = userEvent.setup()
    renderCalendar({ mode: "single", dir: "rtl" })
    focus("2026-11-26")
    await user.keyboard("{ArrowLeft}")
    expect(focusedDay()).toBe("2026-11-27")
    await user.keyboard("{ArrowRight}")
    expect(focusedDay()).toBe("2026-11-26")
  })

  it("focuses the tab stop on mount with `autoFocus`", () => {
    renderCalendar({
      mode: "single",
      selected: new Date(2026, 10, 3),
      autoFocus: true,
    })
    expect(focusedDay()).toBe("2026-11-03")
  })
})
