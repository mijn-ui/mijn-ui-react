import { cleanup, render, screen } from "@testing-library/react"
import { unknownClasses } from "test-utils"
import { afterEach, describe, expect, it } from "vitest"
import { Tabs, TabsContent, TabsList, TabsTrigger, tabsStyles } from "./tabs"

// Not using `globals: true`, so testing-library's automatic cleanup never
// registers — without this each render stacks onto the previous one's DOM.
afterEach(cleanup)

const renderTabs = (props?: { unstyled?: boolean }) =>
  render(
    <Tabs defaultValue="account" unstyled={props?.unstyled}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account panel</TabsContent>
      <TabsContent value="billing">Billing panel</TabsContent>
    </Tabs>,
  )

const classesOf = (slot: string) =>
  document.querySelector(`[data-slot="${slot}"]`)?.className ?? ""

describe("Tabs", () => {
  it("renders the active panel only", () => {
    renderTabs()
    expect(screen.getByText("Account panel")).toBeDefined()
    expect(screen.queryByText("Billing panel")).toBeNull()
  })

  it("only uses classes the theme can compile", async () => {
    // 0.7 shipped `text-fg-brand-emphasis`, a token theme.css never defined,
    // so the active tab had no colour at all.
    const s = tabsStyles()
    const all = [s.base(), s.list(), s.trigger(), s.content()]
    expect(await unknownClasses(all)).toEqual([])
  })

  it("colours the active trigger with the brand foreground", () => {
    renderTabs()
    const trigger = screen.getByRole("tab", { name: "Account" })
    expect(trigger.getAttribute("data-state")).toBe("active")
    expect(trigger.className).toContain("data-[state=active]:text-fg-brand")
    expect(trigger.className).not.toContain("fg-brand-emphasis")
  })

  it("gives triggers a visible, coloured focus ring", () => {
    renderTabs()
    const classes = screen.getByRole("tab", { name: "Billing" }).className
    expect(classes).toContain("focus-visible:ring-2")
    expect(classes).toContain("focus-visible:ring-outline-brand")
  })

  it("drops default classes when unstyled", () => {
    renderTabs({ unstyled: true })
    expect(classesOf("tabs-trigger")).not.toContain("text-fg-secondary")
  })
})
