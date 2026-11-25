import { cleanup, render, screen } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  selectStyles,
} from "./select"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const Dot = () => (
  <svg data-testid="dot" className="size-2">
    <circle cx="4" cy="4" r="4" />
  </svg>
)

const renderSelect = (props?: {
  position?: "popper" | "item-aligned"
  contentClassName?: string
  open?: boolean
}) =>
  render(
    <Select defaultValue="active" open={props?.open}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        position={props?.position}
        className={props?.contentClassName}
      >
        <SelectItem value="active">
          <span>
            <Dot /> Active
          </span>
        </SelectItem>
        <SelectItem value="archived">Archived</SelectItem>
      </SelectContent>
    </Select>,
  )

const triggerOf = () =>
  document.querySelector<HTMLElement>('[data-slot="select-trigger"]')!
const contentOf = () =>
  document.querySelector<HTMLElement>('[data-slot="select-content"]')!

describe("SelectTrigger", () => {
  it("no longer has a minimum width", () => {
    renderSelect()
    expect(triggerOf().className).not.toContain("min-w-44")
  })

  it("dims only the chevron, not every icon in the trigger", () => {
    renderSelect()
    const trigger = triggerOf()
    expect(trigger.className).not.toContain("[&_svg]:opacity-50")
    expect(trigger.className).toContain(
      "[&_[data-slot=select-trigger-icon]]:opacity-50",
    )

    // That selector has to land on the chevron and nothing else.
    const dimmed = trigger.querySelectorAll("[data-slot=select-trigger-icon]")
    expect(dimmed).toHaveLength(1)
    expect(dimmed[0]?.tagName.toLowerCase()).toBe("svg")
    expect(trigger.contains(screen.getByTestId("dot"))).toBe(true)
    expect(
      screen.getByTestId("dot").matches("[data-slot=select-trigger-icon]"),
    ).toBe(false)
  })

  it("leaves an icon's own size-* alone", () => {
    renderSelect()
    const classes = triggerOf().className
    expect(classes).not.toContain("[&_svg]:size-4")
    expect(classes).toContain("[&_svg:not([class*='size-'])]:size-4")
  })
})

describe("SelectContent", () => {
  it("matches the trigger width in popper mode instead of a fixed w-60", () => {
    renderSelect({ open: true })
    const classes = contentOf().className.split(" ")
    expect(classes).not.toContain("w-60")
    expect(classes).toContain("min-w-(--radix-select-trigger-width)")
    expect(classes).toContain("max-w-(--radix-select-content-available-width)")
  })

  it("sets the trigger-width minimum once, on the content", () => {
    // A second min-width on the viewport, inside the content's 1px border,
    // made the list 2px wider than its trigger.
    renderSelect({ open: true })
    const viewport = document.querySelector('[data-slot="select-viewport"]')
    expect(viewport?.className).not.toContain("--radix-select-trigger-width")
  })

  it("keeps the popper sizing when a className is passed", () => {
    // react-core <= 0.5.1 dropped slot variants passed next to a className;
    // SelectContent merges the className separately so this holds anyway.
    renderSelect({ open: true, contentClassName: "max-h-72" })
    const classes = contentOf().className.split(" ")
    expect(classes).toContain("max-h-72")
    expect(classes).toContain("min-w-(--radix-select-trigger-width)")
    expect(classes).toContain("data-[side=bottom]:translate-y-1")
  })

  it("has no fixed width in item-aligned mode either", () => {
    renderSelect({ open: true, position: "item-aligned" })
    const classes = contentOf().className
    expect(classes).not.toContain("w-60")
    // Radix only defines the trigger-width variable in popper mode.
    expect(classes).not.toContain("--radix-select-trigger-width")
  })

  it("drops default classes when unstyled", () => {
    render(
      <Select defaultValue="a" open unstyled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="menu">
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>,
    )
    expect(contentOf().className).toBe("menu")
  })
})

it("only uses classes the theme can compile", async () => {
  const all = (["popper", "item-aligned"] as const).flatMap((position) =>
    Object.values(selectStyles({ position })).map((slot) =>
      (slot as () => string)(),
    ),
  )
  expect(await unknownClasses(all)).toEqual([])
})
