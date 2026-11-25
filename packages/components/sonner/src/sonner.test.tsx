import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import * as sonner from "sonner"
import { contrastRatio, declarationsFor, themeColors } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { type SonnerSlots, Toaster, sonnerStyles, toast } from "./sonner"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
// `toast.dismiss()` matters just as much: sonner's queue is module state, so a
// toast raised by one test is still queued for the next one.
afterEach(() => {
  toast.dismiss()
  cleanup()
})

/**
 * Sonner renders only an empty <section> until a toast exists; the
 * <ol data-sonner-toaster> that carries our className and style appears with
 * the first toast. So anything asserting on the toaster's own styling has to
 * raise one first.
 */
const showToast = async (message = "Settings saved") => {
  toast(message)
  await screen.findByText(message)
  const el = document.querySelector<HTMLElement>("[data-sonner-toaster]")
  if (!el) throw new Error("toaster element never appeared")
  return el
}

describe("Toaster", () => {
  it("renders its live region", () => {
    const { container } = render(<Toaster />)
    expect(
      container.querySelector('section[aria-live="polite"]'),
    ).not.toBeNull()
  })

  it("re-exports the same `toast` instance as sonner itself", () => {
    // The whole reason `sonner` is a peer dependency. If a consumer ever ends
    // up with two copies, `toast()` enqueues into a store the mounted
    // <Toaster /> is not rendering and nothing appears, with no error to
    // explain it. Identity here is what rules that out.
    expect(toast).toBe(sonner.toast)
  })

  it("shows a toast raised through the re-exported `toast`", async () => {
    render(<Toaster />)
    await showToast("Invoice posted")
    expect(screen.getByText("Invoice posted")).toBeDefined()
  })

  it("maps sonner's surface variables onto theme tokens", async () => {
    render(<Toaster />)
    const el = await showToast()

    expect(el.style.getPropertyValue("--normal-bg")).toBe(
      "var(--color-bg-default-alt)",
    )
    expect(el.style.getPropertyValue("--error-bg")).toBe(
      "var(--color-bg-danger-subtle)",
    )
  })

  it("gives info toasts their own colour, not the brand's", async () => {
    // With a green brand, brand-subtle is success-subtle: info toasts were
    // indistinguishable from success ones.
    render(<Toaster />)
    const el = await showToast()
    const info = el.style.getPropertyValue("--info-bg")
    expect(info).toBe("var(--color-bg-blue-subtle)")
    expect(info).not.toContain("brand")
    expect(info).not.toBe(el.style.getPropertyValue("--success-bg"))
  })

  it("keeps every rich-colour title readable in light and dark", async () => {
    // The title inherits the toast's --<type>-text on its --<type>-bg.
    render(<Toaster />)
    const el = await showToast()
    const token = (variable: string) =>
      el.style
        .getPropertyValue(variable)
        .match(/^var\(--color-([a-z0-9-]+)\)$/)?.[1] ?? ""
    const { light, dark } = themeColors()

    for (const type of ["success", "info", "warning", "error"]) {
      const text = token(`--${type}-text`)
      const bg = token(`--${type}-bg`)
      for (const [mode, colors] of [
        ["light", light],
        ["dark", dark],
      ] as const) {
        expect(
          contrastRatio(colors[text], colors[bg]),
          `${type} title in ${mode}`,
        ).toBeGreaterThanOrEqual(4.5)
      }
    }
  })

  it("drops the token mapping when unstyled", async () => {
    render(<Toaster unstyled />)
    const el = await showToast()

    expect(el.style.getPropertyValue("--normal-bg")).toBe("")
  })

  it("themes the toast itself", async () => {
    render(<Toaster />)
    await showToast()

    await waitFor(() => {
      const el = document.querySelector("[data-sonner-toast]")
      expect(el?.className).toContain("bg-bg-default-alt")
    })
  })

  it("lets a caller override one slot without losing the others", async () => {
    render(<Toaster toastOptions={{ classNames: { toast: "custom-toast" } }} />)
    await showToast("With description")

    await waitFor(() => {
      const el = document.querySelector("[data-sonner-toast]")
      expect(el?.className).toContain("custom-toast")
    })
  })
})

/* -------------------------------------------------------------------------- */

/**
 * sonner injects its stylesheet outside any cascade layer, so its rules beat
 * every Tailwind utility (those live in `@layer utilities`) no matter how
 * specific. A slot class therefore only applies if sonner sets no property it
 * sets — or if it is `!important`. 0.7's toast title stayed `font-weight: 500`
 * under `font-semibold` for exactly this reason.
 *
 * This reads sonner's real stylesheet, collects the properties it sets on each
 * slot's element, compiles each slot's classes with Tailwind, and requires
 * every competing declaration to be `!important`.
 */
describe("slot classes against sonner's own stylesheet", () => {
  const sonnerCss = readFileSync(
    join(
      dirname(createRequire(import.meta.url).resolve("sonner")),
      "styles.css",
    ),
    "utf8",
  ).replace(/\/\*[\s\S]*?\*\//g, "")

  // The attribute sonner puts on each slot's element. The cancel button is
  // also a [data-button], so it gets both sets of rules.
  const SLOT_ELEMENT: Record<Exclude<SonnerSlots, "toast">, string[]> = {
    title: ["[data-title]"],
    description: ["[data-description]"],
    actionButton: ["[data-button]"],
    cancelButton: ["[data-button]", "[data-cancel]"],
    closeButton: ["[data-close-button]"],
    icon: ["[data-icon]"],
  }

  /** Shorthands and physical sides, reduced to what Tailwind emits. */
  const families = (property: string): string[] => {
    if (property === "background") return ["background-color"]
    if (property === "border")
      return ["border-width", "border-style", "border-color"]
    if (property === "padding") return ["padding-inline", "padding-block"]
    if (property === "margin") return ["margin-inline", "margin-block"]
    const side = property.match(
      /^(padding|margin)-(left|right|top|bottom|inline|block)(?:-start|-end)?$/,
    )
    if (side) {
      const axis = /left|right|inline/.test(side[2]) ? "inline" : "block"
      return [`${side[1]}-${axis}`]
    }
    const border = property.match(
      /^border-[a-z]+(?:-start|-end)?-(width|style|color)$/,
    )
    if (border) return [`border-${border[1]}`]
    return [property]
  }

  /** Every property sonner's stylesheet sets on a slot's element. */
  const sonnerProperties = (slot: SonnerSlots): Set<string> => {
    const found = new Set<string>()
    for (const [, selectors, body] of sonnerCss.matchAll(
      /([^{}]+)\{([^{}]*)\}/g,
    )) {
      const targets = selectors.split(",").some((selector) => {
        // The element a selector styles is its last compound.
        const last =
          selector
            .trim()
            .split(/\s*[\s>+~]\s*/)
            .pop() ?? ""
        if (last.includes("::")) return false
        if (slot === "toast")
          return (
            last.includes("[data-sonner-toast]") &&
            !Object.values(SLOT_ELEMENT)
              .flat()
              .some((a) => last.includes(a))
          )
        return SLOT_ELEMENT[slot].some((attr) => last.includes(attr))
      })
      if (!targets) continue
      for (const [, property] of body.matchAll(/([a-z-]+)\s*:/g))
        if (!property.startsWith("--"))
          families(property).forEach((f) => found.add(f))
    }
    return found
  }

  // The toast's colours deliberately stay un-important: they arrive through
  // sonner's --normal-* variables, and `richColors` recolours a toast by
  // overriding exactly these.
  const ALLOWED: Partial<Record<SonnerSlots, string[]>> = {
    toast: ["background-color", "color", "border-color"],
  }

  // At runtime tailwind-variants also returns an empty `base` slot, which the
  // Toaster never uses and the SonnerSlots type does not list.
  const slots = Object.keys(sonnerStyles()).filter(
    (slot): slot is SonnerSlots => slot !== "base",
  )

  it("finds sonner's rules for every slot", () => {
    // Guards the parser: an empty set would make the next test pass vacuously.
    expect(sonnerProperties("toast").has("border-radius")).toBe(true)
    expect(sonnerProperties("title").has("font-weight")).toBe(true)
    expect(sonnerProperties("description").has("color")).toBe(true)
    expect(sonnerProperties("actionButton").has("background-color")).toBe(true)
    expect(sonnerProperties("cancelButton").has("background-color")).toBe(true)
    expect(sonnerProperties("closeButton").has("color")).toBe(true)
    expect(sonnerProperties("icon").has("flex-shrink")).toBe(true)
  })

  it.each(slots)(
    "%s: every class competing with sonner is !important",
    async (slot) => {
      const contested = sonnerProperties(slot)
      const classes = (sonnerStyles()[slot] as () => string)()
      const losing = (await declarationsFor(classes))
        .filter((d) => families(d.property).some((f) => contested.has(f)))
        .filter((d) => !d.important && !ALLOWED[slot]?.includes(d.property))
        .map((d) => d.property)

      expect(losing).toEqual([])
    },
  )

  it("renders the title's weight class on the title element", async () => {
    render(<Toaster />)
    toast("Weighted", { description: "And described" })
    const title = await screen.findByText("Weighted")
    expect(title.hasAttribute("data-title")).toBe(true)
    expect(title.className).toContain("font-semibold!")
  })
})
