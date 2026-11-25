import * as React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { Input, inputStyles } from "./input"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const Icon = () => <svg data-testid="icon" />

describe("Input", () => {
  describe("default (wrapped)", () => {
    it("wraps the input in a positioned div", () => {
      const { container } = render(<Input placeholder="Name" />)
      const wrapper = container.firstElementChild
      expect(wrapper?.tagName).toBe("DIV")
      expect(wrapper?.className).toContain("relative")
      expect(wrapper?.querySelector("[data-slot=input]")).not.toBeNull()
    })

    it("links a floating label to the input with a generated id", () => {
      render(<Input label="Username" />)
      const input = screen.getByLabelText("Username")
      expect(input.id).not.toBe("")
      // The floating label positions itself with :placeholder-shown, which
      // needs a placeholder attribute, even an empty one.
      expect(input.getAttribute("placeholder")).toBe("")
    })

    it("forces neither an id nor a placeholder when there is no label", () => {
      render(<Input aria-label="Search" />)
      const input = screen.getByRole("textbox", { name: "Search" })
      expect(input.hasAttribute("id")).toBe(false)
      expect(input.hasAttribute("placeholder")).toBe(false)
    })

    it("keeps a caller's id and placeholder", () => {
      render(<Input id="email" placeholder="you@example.com" label="Email" />)
      const input = screen.getByLabelText("Email")
      expect(input.id).toBe("email")
      expect(input.getAttribute("placeholder")).toBe("you@example.com")
    })
  })

  describe("bare", () => {
    it("renders just the <input>", () => {
      const { container } = render(<Input bare aria-label="Amount" />)
      expect(container.childElementCount).toBe(1)
      const input = container.firstElementChild as HTMLElement
      expect(input.tagName).toBe("INPUT")
      expect(input.getAttribute("data-slot")).toBe("input")
      expect(input.className).toContain("bg-bg-secondary")
    })

    it("sets no id or placeholder of its own", () => {
      render(<Input bare aria-label="Amount" />)
      const input = screen.getByRole("textbox", { name: "Amount" })
      expect(input.hasAttribute("id")).toBe(false)
      expect(input.hasAttribute("placeholder")).toBe(false)
    })

    it("passes id, placeholder, ref and native props through", () => {
      const ref = React.createRef<HTMLInputElement>()
      render(
        <Input
          bare
          ref={ref}
          id="qty"
          name="qty"
          type="number"
          placeholder="0"
          aria-label="Quantity"
        />,
      )
      const input = screen.getByRole("spinbutton", { name: "Quantity" })
      expect(ref.current).toBe(input)
      expect(input.id).toBe("qty")
      expect(input.getAttribute("name")).toBe("qty")
      expect(input.getAttribute("placeholder")).toBe("0")
    })

    it("carries the disabled look itself, since there is no wrapper", () => {
      render(<Input bare disabled aria-label="Locked" />)
      const input = screen.getByRole("textbox", { name: "Locked" })
      expect(input.className).toContain("disabled:opacity-50")
      expect(input.className).toContain("disabled:cursor-not-allowed")
    })

    it("does not move the disabled look onto a wrapped input", () => {
      const { container } = render(<Input disabled aria-label="Locked" />)
      expect(container.firstElementChild?.className).toContain("opacity-50")
      expect(container.querySelector("input")?.className ?? "").not.toContain(
        "disabled:opacity-50",
      )
    })

    it("is ignored when an icon or a label needs the wrapper", () => {
      const withIcon = render(<Input bare startIcon={<Icon />} />)
      expect(withIcon.container.firstElementChild?.tagName).toBe("DIV")
      expect(screen.getByTestId("icon")).toBeDefined()
      cleanup()

      render(<Input bare label="Username" />)
      expect(screen.getByLabelText("Username").tagName).toBe("INPUT")
    })

    it("drops default classes when unstyled", () => {
      render(<Input bare unstyled className="field" aria-label="Plain" />)
      expect(screen.getByRole("textbox", { name: "Plain" }).className).toBe(
        "field",
      )
    })
  })

  it("only uses classes the theme can compile", async () => {
    const combos = (["default", "underline", "danger"] as const).flatMap(
      (variant) =>
        (["default", "lg"] as const).flatMap((size) =>
          [false, true].map((flag) => {
            const s = inputStyles({
              variant,
              size,
              disabled: flag,
              startIcon: flag,
              endIcon: flag,
              bare: flag,
            })
            return [s.wrapper(), s.base(), s.label(), s.startIcon()]
          }),
        ),
    )
    expect(await unknownClasses(combos.flat())).toEqual([])
  })
})
