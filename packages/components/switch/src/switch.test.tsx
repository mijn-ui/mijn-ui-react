import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { contrastRatio, themeColors, unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { Switch, switchStyles } from "./switch"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

describe("Switch", () => {
  it("toggles", () => {
    render(<Switch aria-label="Notifications" />)
    const control = screen.getByRole("switch", { name: "Notifications" })
    expect(control.getAttribute("aria-checked")).toBe("false")
    fireEvent.click(control)
    expect(control.getAttribute("aria-checked")).toBe("true")
  })

  it("keeps hover on a disabled switch, so its title can show", () => {
    render(<Switch disabled title="Requires admin rights" aria-label="Sync" />)
    const control = screen.getByRole("switch", { name: "Sync" })
    expect(control.getAttribute("title")).toBe("Requires admin rights")
    expect(control.className).not.toContain("pointer-events-none")
    expect(control.className).toContain("disabled:cursor-not-allowed")
  })

  it("sets the unchecked thumb off from its track in dark mode", () => {
    const thumb = switchStyles().thumb()
    expect(thumb).toContain("in-[.dark]:data-[state=unchecked]:bg-fg-default")

    // Contrast of the thumb against the unchecked track (`bg-tertiary`), with
    // the colours theme.css defines for `.dark`. It was ~1.3:1 with the
    // near-black `bg-default`; 3:1 is WCAG's floor for UI components. Light
    // mode keeps `bg-default`, set off by the thumb's shadow.
    const { dark } = themeColors()
    const before = contrastRatio(dark["bg-default"], dark["bg-tertiary"])
    const after = contrastRatio(dark["fg-default"], dark["bg-tertiary"])
    expect(before).toBeLessThan(3)
    expect(after).toBeGreaterThanOrEqual(3)
  })

  it("only uses classes the theme can compile", async () => {
    const s = switchStyles()
    expect(await unknownClasses([s.base(), s.thumb()])).toEqual([])
  })

  it("drops default classes when unstyled", () => {
    render(<Switch unstyled className="custom" aria-label="Bare" />)
    expect(screen.getByRole("switch", { name: "Bare" }).className).toBe(
      "custom",
    )
  })
})
