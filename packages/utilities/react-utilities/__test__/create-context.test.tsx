import { it, expect, describe } from "vitest"
import { renderHook, render, screen } from "@testing-library/react"
import { createContext } from "../src"

describe("createContext", () => {
  const CONTEXT_VALUE = 58
  const CONTEXT_VALUE_ALT = 200
  const CONTEXT_VALUE_STR = "some context"

  describe("Default Options", () => {
    const [ContextProvider, useContext, Context] = createContext<number>()

    it("should use default strict mode and throw an error if no provider is used", () => {
      const test = () => renderHook(() => useContext())

      expect(test).toThrowError(/\buseContext: `context` is undefined\b/i)
    })

    it("should set Context.displayName to undefined if no name is provided", () => {
      expect(Context.displayName).toBeUndefined()
    })

    it("should return the provided value from the provider", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ContextProvider value={CONTEXT_VALUE}>{children}</ContextProvider>
      )

      const { result } = renderHook(() => useContext(), { wrapper })

      expect(result.current).toBe(CONTEXT_VALUE)
    })
  })

  describe("Custom Error Message & Name (Strict Mode)", () => {
    const CUSTOM_ERROR_MESSAGE = "useContext error!!!"
    const CUSTOM_NAME = "custom context name"
    const [_, useContext, Context] = createContext<number>({
      strict: true,
      errorMessage: CUSTOM_ERROR_MESSAGE,
      name: CUSTOM_NAME,
    })

    it("should throw the custom error message when no provider is used", () => {
      const test = () => renderHook(() => useContext())

      expect(test).toThrowError(CUSTOM_ERROR_MESSAGE)
    })

    it("should set Context.displayName to custom name if provided one", () => {
      expect(Context.displayName).toBe(CUSTOM_NAME)
    })
  })

  describe("Non-Strict Mode", () => {
    const [ContextProvider, useContext] = createContext<number>({
      strict: false,
    })

    it("should not throw an error when no provider is used", () => {
      const { result } = renderHook(() => useContext())

      expect(result.current).toBeUndefined()
    })

    it("should return the provided value when a provider is used", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ContextProvider value={CONTEXT_VALUE}>{children}</ContextProvider>
      )

      const { result } = renderHook(() => useContext(), { wrapper })

      expect(result.current).toBe(CONTEXT_VALUE)
    })
  })

  describe("Nested Providers", () => {
    const [ContextProvider, useContext] = createContext<number>()

    it("should return the value from the closest provider", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ContextProvider value={CONTEXT_VALUE_ALT}>
          <ContextProvider value={CONTEXT_VALUE}>{children}</ContextProvider>
        </ContextProvider>
      )

      const { result } = renderHook(() => useContext(), { wrapper })

      expect(result.current).toBe(CONTEXT_VALUE) // Closest provider's value
    })
  })

  describe("Multiple Context Providers", () => {
    const [ContextProviderA, useContextA] = createContext<string>()
    const [ContextProviderB, useContextB] = createContext<number>()

    it("should isolate values between multiple context providers", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ContextProviderA value={CONTEXT_VALUE_STR}>
          <ContextProviderB value={CONTEXT_VALUE}>{children}</ContextProviderB>
        </ContextProviderA>
      )

      const { result: resultA } = renderHook(() => useContextA(), { wrapper })
      const { result: resultB } = renderHook(() => useContextB(), { wrapper })

      expect(resultA.current).toBe(CONTEXT_VALUE_STR)
      expect(resultB.current).toBe(CONTEXT_VALUE)
    })
  })

  describe("Dynamic ContextProvider Value", () => {
    /*
      This test is written with render, instead of renderHook because renderHook in
      react-testing-library doesn't allow any other arguments except children to be passed
      into wrapper, which is required in order to change the context value on rerender.
      Normally with react-hooks-testing-library, this test can be written cleanly using
      renderHook function, but it no longer supports React 18 and above.
    */

    const [ContextProvider, useContext] = createContext<number>()

    it("should update the context value when the provider value changes", async () => {
      const TestComponent = () => {
        const value = useContext()
        return <div data-testid="context-value">{value}</div>
      }

      const Wrapper = ({ value }: { value: number }) => (
        <ContextProvider value={value}>
          <TestComponent />
        </ContextProvider>
      )

      const { rerender } = render(<Wrapper value={CONTEXT_VALUE} />)
      expect(screen.getByTestId("context-value").textContent).toBe(
        `${CONTEXT_VALUE}`,
      )

      rerender(<Wrapper value={CONTEXT_VALUE_ALT} />)
      expect(screen.getByTestId("context-value").textContent).toBe(
        `${CONTEXT_VALUE_ALT}`,
      )
    })
  })

  describe("Error with Custom Stack Trace", () => {
    const [_, useContext] = createContext<number>({ strict: true })

    it("should include a custom stack trace in the error when no provider is used", () => {
      try {
        renderHook(() => useContext())

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        expect(error).toBeInstanceOf(Error)
        expect(error.name).toBe("ContextError")
        expect(error.stack).toContain("useContext")
      }
    })
  })
})
