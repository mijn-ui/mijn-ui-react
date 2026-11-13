import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const renderTooltip = (props?: { open?: boolean }) =>
  render(
    <TooltipProvider>
      <Tooltip open={props?.open}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Help text</TooltipContent>
      </Tooltip>
    </TooltipProvider>,
  )

describe("Tooltip", () => {
  it("renders its trigger", () => {
    renderTooltip()
    expect(screen.getByText("Hover me")).toBeDefined()
  })

  it("keeps its content out of the document while closed", () => {
    renderTooltip()
    expect(screen.queryByText("Help text")).toBeNull()
  })

  it("renders its content when open", () => {
    renderTooltip({ open: true })
    expect(screen.getAllByText("Help text").length).toBeGreaterThan(0)
  })

  it("throws a named error when TooltipProvider is missing", () => {
    // Radix creates the provider context with no default value, so this is a
    // hard failure rather than a silently inert tooltip.
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined)
    expect(() =>
      render(
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
        </Tooltip>,
      ),
    ).toThrow(/Tooltip/)
    spy.mockRestore()
  })

  it("throws when a part is used outside <Tooltip />", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined)
    expect(() =>
      render(
        <TooltipProvider>
          <TooltipTrigger>Orphan</TooltipTrigger>
        </TooltipProvider>,
      ),
    ).toThrow(/useTooltipContext/)
    spy.mockRestore()
  })

  it("applies default classes, and drops them when unstyled", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Styled</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(
      document.querySelector('[data-slot="tooltip-content"]')?.className,
    ).toContain("bg-bg-inverse")
    cleanup()

    render(
      <TooltipProvider>
        <Tooltip open unstyled>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Bare</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(
      document.querySelector('[data-slot="tooltip-content"]')?.className ?? "",
    ).not.toContain("bg-bg-inverse")
  })

  it("merges per-slot classNames", () => {
    render(
      <TooltipProvider>
        <Tooltip open classNames={{ content: "max-w-sm" }}>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Help text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(
      document.querySelector('[data-slot="tooltip-content"]')?.className,
    ).toContain("max-w-sm")
  })
})
