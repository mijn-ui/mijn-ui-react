import { cleanup, render } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { Calendar, calendarStyles } from "./calendar"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const renderCalendar = () =>
  render(
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 10, 1)}
      selected={new Date(2026, 10, 12)}
    />,
  )

describe("Calendar", () => {
  it("only uses classes the theme can compile", async () => {
    // 0.7 shipped `focus:!bg-bg-brandfocus:!text-on-bg-brand` — two classes
    // fused by a missing space, which compiles to nothing.
    const slots = Object.values(calendarStyles()) as Array<() => string>
    const all = slots.map((slot) => slot())
    // react-day-picker hooks for the `[&:has(...)]` selectors, CSS-less on
    // purpose.
    const markers = ["day-outside", "day-range-end"]
    expect(await unknownClasses(all, markers)).toEqual([])
  })

  it("keeps the selected day in brand colours while it has focus", () => {
    renderCalendar()
    const selected = document.querySelector('[data-day="2026-11-12"]')
    expect(selected?.getAttribute("aria-selected")).toBe("true")

    const classes = selected?.className.split(" ") ?? []
    expect(classes).toContain("focus-within:bg-bg-brand!")
    expect(classes).toContain("focus-within:text-on-bg-brand!")
    expect(selected?.className).not.toContain("brandfocus")
  })

  it("draws the focus ring on the day whose button has keyboard focus", () => {
    renderCalendar()
    const day = document.querySelector('[data-day="2026-11-12"]')
    // Focus lands on the button inside the cell, so the cell has to ask
    // `:has(:focus-visible)` — a plain `focus-visible:` on it never matches.
    expect(day?.querySelector("button")).not.toBeNull()
    expect(day?.className).toContain("has-focus-visible:ring-2")
    expect(day?.className).toContain("has-focus-visible:ring-outline-brand")
    expect(day?.className).not.toMatch(/(^|\s)focus-visible:/)
  })

  it("drops default classes when unstyled", () => {
    render(
      <Calendar
        unstyled
        mode="single"
        defaultMonth={new Date(2026, 10, 1)}
        selected={new Date(2026, 10, 12)}
      />,
    )
    const day = document.querySelector('[data-day="2026-11-12"]')
    expect(day?.className ?? "").not.toContain("bg-bg-brand")
  })
})
