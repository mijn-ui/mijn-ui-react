import * as React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@mijn-ui/react-tooltip"
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlProps,
} from "./segmented-control"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const REASON = "Replacing a page's file needs permission to edit knowledge."

/** Skip · Keep both · Replace (disabled) · Rename, between two plain buttons. */
const Decision = (props: Partial<SegmentedControlProps>) => (
  <>
    <button>Before</button>
    <SegmentedControl aria-label="Duplicate" {...props}>
      <SegmentedControlItem value="skip">Skip</SegmentedControlItem>
      <SegmentedControlItem value="keep">Keep both</SegmentedControlItem>
      <SegmentedControlItem value="replace" disabledReason={REASON}>
        Replace
      </SegmentedControlItem>
      <SegmentedControlItem value="rename">Rename</SegmentedControlItem>
    </SegmentedControl>
    <button>After</button>
  </>
)

const Status = (props: Partial<SegmentedControlProps>) => (
  <SegmentedControl semantics="tabs" aria-label="Status" {...props}>
    <SegmentedControlItem value="open" count={3}>
      To check
    </SegmentedControlItem>
    <SegmentedControlItem value="fixed" count={12}>
      Fixed
    </SegmentedControlItem>
    <SegmentedControlItem value="dismissed" disabled>
      Not a conflict
    </SegmentedControlItem>
  </SegmentedControl>
)

/** Controlled from the outside, the way both consumer apps use it. */
const Controlled = ({
  initial,
  onValueChange,
  semantics,
}: {
  initial: string | null
  onValueChange?: (value: string) => void
  semantics?: "radio" | "tabs"
}) => {
  const [value, setValue] = React.useState<string | null>(initial)
  const Component = semantics === "tabs" ? Status : Decision
  return (
    <Component
      value={value}
      onValueChange={(next) => {
        setValue(next)
        onValueChange?.(next)
      }}
    />
  )
}

const radio = (name: string) => screen.getByRole("radio", { name })
const tab = (name: RegExp | string) => screen.getByRole("tab", { name })

/**
 * Press an arrow key the way a person does: down, focus moves, up. Radix moves
 * focus on a timeout and a radio selects itself on focus only while an arrow
 * key is still held, so a press and release in the same tick never selects.
 */
const press = async (
  user: ReturnType<typeof userEvent.setup>,
  key: string,
  lands: () => HTMLElement,
) => {
  await user.keyboard(`{${key}>}`)
  await waitFor(() => expect(document.activeElement).toBe(lands()))
  await user.keyboard(`{/${key}}`)
}

describe("SegmentedControl — radio semantics", () => {
  it("is a named radiogroup of radios, checked by value", () => {
    render(<Decision defaultValue="keep" />)

    const group = screen.getByRole("radiogroup", { name: "Duplicate" })
    expect(within(group).getAllByRole("radio")).toHaveLength(4)
    expect(radio("Keep both").getAttribute("aria-checked")).toBe("true")
    expect(radio("Skip").getAttribute("aria-checked")).toBe("false")
    expect(screen.queryByRole("tablist")).toBeNull()
  })

  it("moves AND selects with the arrow keys, wrapping and skipping disabled", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Controlled initial="keep" onValueChange={onValueChange} />)

    radio("Keep both").focus()
    // Replace is disabled, so Right goes from Keep both straight to Rename.
    await press(user, "ArrowRight", () => radio("Rename"))
    expect(radio("Rename").getAttribute("aria-checked")).toBe("true")

    // Right from the last wraps to the first.
    await press(user, "ArrowRight", () => radio("Skip"))
    expect(radio("Skip").getAttribute("aria-checked")).toBe("true")

    // Left from the first wraps to the last; Up/Down work too.
    await press(user, "ArrowLeft", () => radio("Rename"))
    await press(user, "ArrowUp", () => radio("Keep both"))
    expect(radio("Keep both").getAttribute("aria-checked")).toBe("true")

    expect(onValueChange.mock.calls.map(([value]) => value)).toEqual([
      "rename",
      "skip",
      "rename",
      "keep",
    ])
  })

  it("is one tab stop, on the selected option", async () => {
    const user = userEvent.setup()
    render(<Decision defaultValue="rename" />)

    await user.tab()
    expect(document.activeElement).toBe(screen.getByText("Before"))
    await user.tab()
    expect(document.activeElement).toBe(radio("Rename"))
    await user.tab()
    expect(document.activeElement).toBe(screen.getByText("After"))
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(radio("Rename"))
    await user.tab({ shift: true })
    expect(document.activeElement).toBe(screen.getByText("Before"))
  })
})

describe("SegmentedControl — an unset value", () => {
  it("checks nothing, and gives the tab stop to the first enabled option without selecting it", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Controlled initial={null} onValueChange={onValueChange} />)

    for (const option of screen.getAllByRole("radio")) {
      expect(option.getAttribute("aria-checked")).toBe("false")
    }

    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(radio("Skip"))
    expect(radio("Skip").getAttribute("aria-checked")).toBe("false")
    expect(onValueChange).not.toHaveBeenCalled()

    // Answering it is an explicit act: Space.
    await user.keyboard(" ")
    expect(onValueChange).toHaveBeenCalledWith("skip")
    expect(radio("Skip").getAttribute("aria-checked")).toBe("true")
  })

  it("skips a disabled first option for the tab stop", async () => {
    const user = userEvent.setup()
    render(
      <SegmentedControl aria-label="Duplicate" value={null}>
        <SegmentedControlItem value="replace" disabledReason={REASON}>
          Replace
        </SegmentedControlItem>
        <SegmentedControlItem value="skip">Skip</SegmentedControlItem>
      </SegmentedControl>,
    )

    await user.tab()
    expect(document.activeElement).toBe(radio("Skip"))
  })

  it("passes over a selected option that is disabled", async () => {
    const user = userEvent.setup()
    render(<Decision value="replace" />)

    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(radio("Skip"))
  })
})

describe("SegmentedControl — tabs semantics", () => {
  it("is a named tablist of tabs, selected by value", () => {
    render(<Status defaultValue="fixed" />)

    const list = screen.getByRole("tablist", { name: "Status" })
    expect(within(list).getAllByRole("tab")).toHaveLength(3)
    expect(tab(/Fixed/).getAttribute("aria-selected")).toBe("true")
    expect(tab(/To check/).getAttribute("aria-selected")).toBe("false")
    expect(screen.queryByRole("radiogroup")).toBeNull()
  })

  it("points at no panel it does not render, unless given one", () => {
    render(
      <SegmentedControl semantics="tabs" aria-label="View" defaultValue="a">
        <SegmentedControlItem value="a">A</SegmentedControlItem>
        <SegmentedControlItem value="b" aria-controls="results">
          B
        </SegmentedControlItem>
      </SegmentedControl>,
    )

    expect(tab("A").hasAttribute("aria-controls")).toBe(false)
    expect(tab("B").getAttribute("aria-controls")).toBe("results")
  })

  it("moves AND selects with Left/Right, wrapping and skipping disabled", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Controlled
        semantics="tabs"
        initial="open"
        onValueChange={onValueChange}
      />,
    )

    tab(/To check/).focus()
    await press(user, "ArrowRight", () => tab(/Fixed/))
    expect(tab(/Fixed/).getAttribute("aria-selected")).toBe("true")

    // "Not a conflict" is disabled, so Right wraps past it to the first tab.
    await press(user, "ArrowRight", () => tab(/To check/))
    expect(tab(/To check/).getAttribute("aria-selected")).toBe("true")

    await press(user, "ArrowLeft", () => tab(/Fixed/))
    expect(tab(/Fixed/).getAttribute("aria-selected")).toBe("true")

    // A horizontal tablist answers Left/Right only; Up/Down are the page's.
    await user.keyboard("{ArrowDown}")
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(document.activeElement).toBe(tab(/Fixed/))

    expect(onValueChange.mock.calls.map(([value]) => value)).toEqual([
      "fixed",
      "open",
      "fixed",
    ])
  })

  it("is one tab stop, on the selected tab", async () => {
    const user = userEvent.setup()
    render(
      <>
        <Status defaultValue="fixed" />
        <button>After</button>
      </>,
    )

    await user.tab()
    expect(document.activeElement).toBe(tab(/Fixed/))
    await user.tab()
    expect(document.activeElement).toBe(screen.getByText("After"))
  })
})

describe("SegmentedControl — controlled and uncontrolled", () => {
  it("uncontrolled: owns the selection from defaultValue", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Decision defaultValue="skip" onValueChange={onValueChange} />)

    await user.click(radio("Rename"))
    expect(radio("Rename").getAttribute("aria-checked")).toBe("true")
    expect(radio("Skip").getAttribute("aria-checked")).toBe("false")
    expect(onValueChange).toHaveBeenCalledWith("rename")
  })

  it("controlled: reports the choice but shows only what it is given", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <Decision value="skip" onValueChange={onValueChange} />,
    )

    await user.click(radio("Rename"))
    expect(onValueChange).toHaveBeenCalledWith("rename")
    expect(radio("Skip").getAttribute("aria-checked")).toBe("true")
    expect(radio("Rename").getAttribute("aria-checked")).toBe("false")

    rerender(<Decision value="rename" onValueChange={onValueChange} />)
    expect(radio("Rename").getAttribute("aria-checked")).toBe("true")
  })

  it("controlled tabs: same contract", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Status value="open" onValueChange={onValueChange} />)

    await user.click(tab(/Fixed/))
    expect(onValueChange).toHaveBeenCalledWith("fixed")
    expect(tab(/To check/).getAttribute("aria-selected")).toBe("true")
  })
})

describe("SegmentedControlItem — disabled, with a reason", () => {
  it("is aria-disabled, not natively disabled, and reads its reason as the description", () => {
    render(<Decision defaultValue="skip" />)

    const replace = screen.getByRole("radio", {
      name: "Replace",
      description: REASON,
    })
    expect(replace.getAttribute("aria-disabled")).toBe("true")
    expect(replace.hasAttribute("disabled")).toBe(false)
    // The reason is the description only — the name stays "Replace".
    expect(radio("Skip").hasAttribute("aria-describedby")).toBe(false)
  })

  it("keeps a description it is given alongside the reason", () => {
    render(
      <>
        <p id="hint">Applies to all four files.</p>
        <SegmentedControl aria-label="Duplicate">
          <SegmentedControlItem
            value="replace"
            disabledReason={REASON}
            aria-describedby="hint"
          >
            Replace
          </SegmentedControlItem>
        </SegmentedControl>
      </>,
    )

    expect(
      screen.getByRole("radio", {
        name: "Replace",
        description: `Applies to all four files. ${REASON}`,
      }),
    ).toBeDefined()
  })

  it("cannot be selected by click or by Space, in either semantics", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const { rerender } = render(
      <Decision defaultValue="skip" onValueChange={onValueChange} />,
    )

    await user.click(radio("Replace"))
    radio("Replace").focus()
    await user.keyboard(" ")
    await user.keyboard("{Enter}")
    expect(radio("Replace").getAttribute("aria-checked")).toBe("false")

    rerender(<Status defaultValue="open" onValueChange={onValueChange} />)
    const dismissed = tab("Not a conflict")
    expect(dismissed.getAttribute("aria-disabled")).toBe("true")
    await user.click(dismissed)
    dismissed.focus()
    await user.keyboard(" ")
    await user.keyboard("{Enter}")
    expect(dismissed.getAttribute("aria-selected")).toBe("false")

    expect(onValueChange).not.toHaveBeenCalled()
  })

  // jsdom delivers pointer events even to natively disabled buttons, which
  // browsers do not — so it is the "not natively disabled" assertion above
  // that guards hoverability. This one guards the composition itself.
  it("composes inside <TooltipTrigger asChild>, which opens on hover", async () => {
    const user = userEvent.setup()
    render(
      <TooltipProvider delayDuration={0}>
        <SegmentedControl aria-label="Duplicate" defaultValue="skip">
          <SegmentedControlItem value="skip">Skip</SegmentedControlItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SegmentedControlItem value="replace" disabledReason={REASON}>
                Replace
              </SegmentedControlItem>
            </TooltipTrigger>
            <TooltipContent>{REASON}</TooltipContent>
          </Tooltip>
        </SegmentedControl>
      </TooltipProvider>,
    )

    // The trigger's own data-slot does not overwrite the item's.
    expect(radio("Replace").getAttribute("data-slot")).toBe(
      "segmented-control-item",
    )
    await user.hover(radio("Replace"))
    expect((await screen.findByRole("tooltip")).textContent).toBe(REASON)
  })
})

describe("SegmentedControlItem — count", () => {
  it("renders after the label, muted, as part of the name", () => {
    render(<Status defaultValue="open" />)

    const count = tab("To check 3").querySelector(
      '[data-slot="segmented-control-count"]',
    )
    expect(count?.textContent).toBe("3")
    expect(count?.className).toContain("text-fg-secondary")
  })

  it("renders a count of zero", () => {
    render(
      <SegmentedControl aria-label="Status">
        <SegmentedControlItem value="open" count={0}>
          To check
        </SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(radio("To check 0")).toBeDefined()
  })
})

describe("SegmentedControl — styling", () => {
  const item = () =>
    document.querySelector('[data-slot="segmented-control-item"]')
  const base = () => document.querySelector('[data-slot="segmented-control"]')

  it("applies default classes per size, and drops them when unstyled", () => {
    render(<Decision />)
    expect(base()?.className).toContain("bg-bg-secondary")
    expect(item()?.className).toContain("h-7")
    cleanup()

    render(<Decision size="xs" />)
    expect(item()?.className).toContain("h-5")
    cleanup()

    render(<Decision unstyled />)
    expect(base()?.className ?? "").toBe("")
    expect(item()?.className ?? "").toBe("")
  })

  it("lets one item opt out of unstyled, or into it", () => {
    render(
      <SegmentedControl aria-label="Duplicate" unstyled>
        <SegmentedControlItem value="a" unstyled={false}>
          A
        </SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(radio("A").className).toContain("rounded-sm")
  })

  it("merges per-slot classNames, and className last", () => {
    render(
      <SegmentedControl
        aria-label="Status"
        className="w-full"
        classNames={{
          base: "rounded-full",
          item: "rounded-full",
          count: "text-fg-brand",
        }}
      >
        <SegmentedControlItem value="open" count={3} className="flex-1">
          To check
        </SegmentedControlItem>
      </SegmentedControl>,
    )

    expect(base()?.className).toContain("rounded-full")
    expect(base()?.className).not.toContain("--radius-base")
    expect(base()?.className).toContain("w-full")
    expect(item()?.className).toContain("rounded-full")
    expect(item()?.className).not.toContain("rounded-sm")
    expect(item()?.className).toContain("flex-1")
    const count = document.querySelector(
      '[data-slot="segmented-control-count"]',
    )
    expect(count?.className).toContain("text-fg-brand")
    expect(count?.className).not.toContain("text-fg-secondary")
  })

  it("throws when an item is used outside <SegmentedControl />", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined)
    expect(() =>
      render(<SegmentedControlItem value="a">Orphan</SegmentedControlItem>),
    ).toThrow(/useSegmentedControlContext/)
    spy.mockRestore()
  })
})
