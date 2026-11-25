import { cleanup, render, screen } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { Button, buttonStyles } from "./button"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

describe("Button", () => {
  describe('variant="link"', () => {
    it("looks like a link: brand text, underline on hover, no fill", () => {
      render(<Button variant="link">Cancel</Button>)
      const classes = screen
        .getByRole("button", { name: "Cancel" })
        .className.split(" ")

      expect(classes).toContain("text-fg-brand")
      expect(classes).toContain("hover:underline")
      expect(classes).toContain("focus-visible:ring-outline-brand")
      // What apps had to strip off brand-plain to fake it.
      expect(classes.some((c) => /(^|:)bg-/.test(c))).toBe(false)
      expect(classes).not.toContain("border")
    })

    it("keeps the button's box, so it lines up next to buttons", () => {
      const classes = buttonStyles({ variant: "link" }).base()
      expect(classes).toContain("h-9")
      expect(classes).toContain("px-3")
    })

    it("can render an anchor with asChild", () => {
      render(
        <Button variant="link" asChild>
          <a href="/help">Read the guide</a>
        </Button>,
      )
      const link = screen.getByRole("link", { name: "Read the guide" })
      expect(link.getAttribute("href")).toBe("/help")
      expect(link.className).toContain("hover:underline")
    })
  })

  it("only uses classes the theme can compile", async () => {
    const variants = [
      "default",
      "default-plain",
      "brand",
      "brand-plain",
      "brand-outline",
      "error",
      "error-plain",
      "link",
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
    const all = variants.flatMap((variant) =>
      colors.map((color) => buttonStyles({ variant, color }).base()),
    )
    expect(await unknownClasses(all)).toEqual([])
  })

  it("drops default classes when unstyled", () => {
    render(
      <Button unstyled variant="link" className="custom">
        Bare
      </Button>,
    )
    expect(screen.getByRole("button", { name: "Bare" }).className).toBe(
      "custom",
    )
  })
})
