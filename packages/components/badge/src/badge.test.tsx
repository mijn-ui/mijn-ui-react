import { cleanup, render, screen } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { Badge, badgeStyles } from "./badge"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const variants = [
  "solid",
  "tonal",
  "modern",
  "filled",
  "outlined",
  "ghost",
  "subtle",
  "light",
] as const
const colors = [
  "default",
  "brand",
  "secondary",
  "success",
  "warning",
  "danger",
  "inverse",
] as const

const everyCombination = () =>
  variants.flatMap((variant) =>
    colors.map((color) => badgeStyles({ variant, color }).base()),
  )

describe("Badge", () => {
  it("renders an inline <span> by default", () => {
    render(<Badge>New</Badge>)
    const badge = screen.getByText("New")
    expect(badge.tagName).toBe("SPAN")
    expect(badge.getAttribute("data-slot")).toBe("badge")
    // inline-flex sits in a line of text; in a flex/grid row the browser
    // blockifies it to `flex`, so it looks as it did when it was a block div.
    expect(badge.className.split(" ")).toContain("inline-flex")
    expect(badge.className.split(" ")).not.toContain("flex")
  })

  it("is valid inside a paragraph", () => {
    const { container } = render(
      <p>
        Invoice <Badge>New</Badge> posted
      </p>,
    )
    expect(container.querySelector("p > [data-slot=badge]")).not.toBeNull()
  })

  it("renders onto its child with asChild", () => {
    render(
      <Badge asChild color="brand">
        <a href="/invoices/42">INV-42</a>
      </Badge>,
    )
    const link = screen.getByRole("link", { name: "INV-42" })
    expect(link.getAttribute("href")).toBe("/invoices/42")
    expect(link.getAttribute("data-slot")).toBe("badge")
    expect(link.className).toContain("bg-bg-brand")
    expect(document.querySelector("span[data-slot=badge]")).toBeNull()
  })

  it("has no hover, press or disabled states in any variant", () => {
    for (const classes of everyCombination()) {
      expect(classes).not.toMatch(/(^|\s)(hover|active|disabled):/)
    }
  })

  it("keeps a focus ring for when asChild makes it a link", () => {
    expect(badgeStyles({ color: "brand" }).base()).toContain(
      "focus-visible:ring-outline-brand",
    )
  })

  it("only uses classes the theme can compile", async () => {
    const sizes = (["sm", "md", "lg"] as const).map((size) =>
      badgeStyles({ size }).base(),
    )
    const radii = (["default", "pill", "full"] as const).map((radius) =>
      badgeStyles({ radius }).base(),
    )
    expect(
      await unknownClasses([...everyCombination(), ...sizes, ...radii]),
    ).toEqual([])
  })

  it("drops default classes when unstyled", () => {
    render(
      <Badge unstyled className="custom">
        Bare
      </Badge>,
    )
    expect(screen.getByText("Bare").className).toBe("custom")
  })
})
