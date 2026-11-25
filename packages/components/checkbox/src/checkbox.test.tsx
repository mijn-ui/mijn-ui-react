import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { Checkbox, checkboxStyles } from "./checkbox"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const iconIn = (name: string) =>
  screen
    .getByRole("checkbox", { name })
    .querySelector<SVGElement>("[data-slot=checkbox-indicator] svg")

describe("Checkbox", () => {
  it("toggles", () => {
    render(<Checkbox aria-label="Subscribe" />)
    const box = screen.getByRole("checkbox", { name: "Subscribe" })
    expect(box.getAttribute("aria-checked")).toBe("false")
    fireEvent.click(box)
    expect(box.getAttribute("aria-checked")).toBe("true")
  })

  it("colours its focus ring with the brand outline", () => {
    // Without a ring colour Tailwind v4 fell back to currentColor, which drew
    // the ring in the text colour. mijn-focus-ring reads the same colour
    // variable, so the explicit ring-outline-brand still matters.
    render(<Checkbox aria-label="Subscribe" />)
    const classes = screen.getByRole("checkbox", {
      name: "Subscribe",
    }).className
    expect(classes).toContain("focus-visible:mijn-focus-ring")
    expect(classes).toContain("focus-visible:ring-outline-brand")
  })

  it("draws the indeterminate state as a 2px bar, not a hairline", () => {
    render(<Checkbox checked="indeterminate" aria-label="Some selected" />)
    const box = screen.getByRole("checkbox", { name: "Some selected" })
    expect(box.getAttribute("aria-checked")).toBe("mixed")

    const icon = iconIn("Some selected")
    // 3 units in a 24-unit viewBox: 2px at the default 16px icon, 1.5px at
    // 12px. The old divider glyph was 1 unit in 15 — about 1px.
    expect(icon?.getAttribute("viewBox")).toBe("0 0 24 24")
    expect(icon?.getAttribute("stroke-width")).toBe("3")
    expect(icon?.querySelector("path")?.getAttribute("d")).toBe("M5 12h14")
  })

  it("keeps the check icon for the checked state", () => {
    render(<Checkbox checked aria-label="All selected" />)
    expect(iconIn("All selected")?.getAttribute("stroke-width")).toBe("2")
  })

  it("lets classNames.icon resize the indeterminate bar", () => {
    render(
      <Checkbox
        checked="indeterminate"
        aria-label="Small"
        className="size-4"
        classNames={{ icon: "size-3" }}
      />,
    )
    expect(iconIn("Small")?.getAttribute("class")).toContain("size-3")
  })

  it("does not forward a color prop to the root", () => {
    // The recipe has no variants, so `color` is only the HTML attribute.
    render(<Checkbox color="red" aria-label="Tinted" />)
    expect(
      screen.getByRole("checkbox", { name: "Tinted" }).hasAttribute("color"),
    ).toBe(false)
  })

  it("only uses classes the theme can compile", async () => {
    const s = checkboxStyles()
    expect(await unknownClasses([s.base(), s.indicator(), s.icon()])).toEqual(
      [],
    )
  })

  it("drops default classes when unstyled", () => {
    render(<Checkbox unstyled className="custom" aria-label="Bare" />)
    expect(screen.getByRole("checkbox", { name: "Bare" }).className).toBe(
      "custom",
    )
  })
})
