import { cleanup, render, screen } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it, vi } from "vitest"
import { Progress, progressStyles } from "./progress"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const bar = () => screen.getByRole("progressbar")
const fill = () =>
  document.querySelector<HTMLElement>('[data-slot="progress-indicator"]')!.style
    .transform

describe("Progress", () => {
  it("exposes its value to assistive technology", () => {
    render(<Progress value={40} aria-label="Upload" />)
    expect(bar().getAttribute("aria-valuenow")).toBe("40")
    expect(bar().getAttribute("aria-valuemin")).toBe("0")
    expect(bar().getAttribute("aria-valuemax")).toBe("100")
    expect(bar().getAttribute("aria-valuetext")).toBe("40%")
    expect(bar().getAttribute("data-state")).toBe("loading")
  })

  it("forwards max, and fills the bar relative to it", () => {
    render(<Progress value={40} max={200} aria-label="Import" />)
    expect(bar().getAttribute("aria-valuenow")).toBe("40")
    expect(bar().getAttribute("aria-valuemax")).toBe("200")
    // 40 of 200 is 20%, not the 40% the bar used to show.
    expect(fill()).toBe("translateX(-80%)")
  })

  it("is complete at max", () => {
    render(<Progress value={5} max={5} aria-label="Steps" />)
    expect(bar().getAttribute("data-state")).toBe("complete")
    expect(fill()).toBe("translateX(0%)")
  })

  it("is indeterminate without a value, with an empty bar", () => {
    render(<Progress aria-label="Waiting" />)
    expect(bar().hasAttribute("aria-valuenow")).toBe(false)
    expect(bar().getAttribute("data-state")).toBe("indeterminate")
    expect(fill()).toBe("translateX(-100%)")
  })

  it("clamps an out-of-range value for the bar", () => {
    // Radix logs an error for it and reports it as indeterminate.
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined)
    render(<Progress value={250} max={200} aria-label="Over" />)
    expect(fill()).toBe("translateX(0%)")
    spy.mockRestore()
  })

  it("only uses classes the theme can compile", async () => {
    const s = progressStyles()
    expect(await unknownClasses([s.base(), s.indicator()])).toEqual([])
  })

  it("drops default classes when unstyled", () => {
    render(<Progress unstyled value={10} className="custom" />)
    expect(bar().className).toBe("custom")
  })
})
