import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Slider } from "./slider"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

describe("Slider", () => {
  it("renders one thumb per value", () => {
    render(<Slider defaultValue={[25, 75]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(2)
  })

  it("renders a single thumb for a single value", () => {
    render(<Slider defaultValue={[50]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(1)
  })

  it("falls back to one thumb when no value is given", () => {
    render(<Slider />)
    expect(screen.getAllByRole("slider")).toHaveLength(1)
  })

  it("tracks a controlled value", () => {
    const { rerender } = render(<Slider value={[10]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(1)

    rerender(<Slider value={[10, 90]} />)
    expect(screen.getAllByRole("slider")).toHaveLength(2)
  })

  it("names each thumb separately", () => {
    // A single name on the root cannot describe two thumbs, and each thumb is
    // its own `role="slider"` — so without these the pair is indistinguishable
    // to a screen reader.
    render(
      <Slider
        defaultValue={[25, 75]}
        thumbAriaLabels={["Minimum", "Maximum"]}
      />,
    )
    expect(screen.getByLabelText("Minimum")).toBeDefined()
    expect(screen.getByLabelText("Maximum")).toBeDefined()
  })

  it("exposes the value range on each thumb", () => {
    render(<Slider defaultValue={[30]} min={0} max={200} />)
    const thumb = screen.getByRole("slider")
    expect(thumb.getAttribute("aria-valuenow")).toBe("30")
    expect(thumb.getAttribute("aria-valuemin")).toBe("0")
    expect(thumb.getAttribute("aria-valuemax")).toBe("200")
  })

  it("applies default classes, and drops them when unstyled", () => {
    const { container, unmount } = render(<Slider defaultValue={[50]} />)
    expect(
      container.querySelector('[data-slot="slider-track"]')?.className,
    ).toContain("bg-bg-tertiary")
    unmount()

    const { container: bare } = render(<Slider defaultValue={[50]} unstyled />)
    expect(
      bare.querySelector('[data-slot="slider-track"]')?.className ?? "",
    ).not.toContain("bg-bg-tertiary")
  })

  it("merges per-slot classNames", () => {
    const { container } = render(
      <Slider defaultValue={[50]} classNames={{ range: "bg-bg-success" }} />,
    )
    expect(
      container.querySelector('[data-slot="slider-range"]')?.className,
    ).toContain("bg-bg-success")
  })
})
