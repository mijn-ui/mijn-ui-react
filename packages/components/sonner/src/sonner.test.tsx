import { cleanup, render, screen, waitFor } from "@testing-library/react"
import * as sonner from "sonner"
import { afterEach, describe, expect, it } from "vitest"
import { Toaster, toast } from "./sonner"

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
