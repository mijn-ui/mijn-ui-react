import { renderHook } from "@testing-library/react"
import { tv } from "tailwind-variants"
import { describe, expect, it } from "vitest"
import { createContext } from "../../utils"
import { useTVUnstyled } from "../use-tv-unstyled"

describe("useTVUnstyled", () => {
  // Constants for default classes
  const DEFAULT_CLASSES = {
    base: "rounded-md",
    icon: "p-4",
    indicator: "border-solid",
  }

  // Constants for variants
  const VARIANTS = {
    color: {
      primary: "bg-bg-brand",
      secondary: "bg-bg-secondary",
      accent: "bg-accent",
    },
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  }

  const DEFAULT_VARIANTS = {
    color: "primary",
    size: "md",
  } as const

  const USER_CLASS = "user-classes"

  // Component styles using tailwind-variants
  const componentStyles = tv({
    slots: {
      base: DEFAULT_CLASSES.base,
      icon: DEFAULT_CLASSES.icon,
      indicator: DEFAULT_CLASSES.indicator,
    },
    variants: VARIANTS,
    defaultVariants: DEFAULT_VARIANTS,
  })

  const styles = componentStyles({
    color: "secondary",
    size: "lg",
  })

  // Context setup
  type ContextType = { unstyled?: boolean } & {
    styles: ReturnType<typeof componentStyles>
  }

  const [ComponentProvider, useComponentContext] = createContext<ContextType>({
    name: "ComponentContext",
    strict: true,
  })

  const verifyClassNames = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any,
    expectedClasses: Record<string, string>,
  ) => {
    Object.entries(expectedClasses).forEach(([slot, expectedClass]) => {
      expect(result.current[slot]({ className: USER_CLASS })).toBe(
        expectedClass,
      )
    })
  }

  // Run hook with context and optional unstyledOverride
  const runTest = (unstyled: boolean, unstyledOverride?: boolean) => {
    return renderHook(
      () => {
        const context = useComponentContext()
        return useTVUnstyled(context, unstyledOverride)
      },
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <ComponentProvider value={{ unstyled, styles }}>
            {children}
          </ComponentProvider>
        ),
      },
    )
  }

  describe("when default unstyled is false", () => {
    const UNSTYLED = false

    it("should return default & user classes if unstyledOverride is undefined", () => {
      const { result } = runTest(UNSTYLED)

      expect(result.current.isUnstyled).toBe(false)

      verifyClassNames(result, {
        base: `${DEFAULT_CLASSES.base} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        indicator: `${DEFAULT_CLASSES.indicator} ${USER_CLASS}`,
        icon: `${DEFAULT_CLASSES.icon} ${USER_CLASS}`,
      })
    })

    it("should return default & user classes if unstyledOverride is false", () => {
      const { result } = runTest(UNSTYLED, false)

      expect(result.current.isUnstyled).toBe(false)

      verifyClassNames(result, {
        base: `${DEFAULT_CLASSES.base} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        indicator: `${DEFAULT_CLASSES.indicator} ${USER_CLASS}`,
        icon: `${DEFAULT_CLASSES.icon} ${USER_CLASS}`,
      })
    })

    it("should return only user classes if unstyledOverride is true", () => {
      const { result } = runTest(UNSTYLED, true)

      expect(result.current.isUnstyled).toBe(true)

      verifyClassNames(result, {
        base: USER_CLASS,
        indicator: USER_CLASS,
        icon: USER_CLASS,
      })
    })
  })

  describe("when default unstyled is true", () => {
    const UNSTYLED = true

    it("should return only user classes if unstyledOverride is undefined", () => {
      const { result } = runTest(UNSTYLED)

      expect(result.current.isUnstyled).toBe(true)

      verifyClassNames(result, {
        base: USER_CLASS,
        indicator: USER_CLASS,
        icon: USER_CLASS,
      })
    })

    it("should return only user classes if unstyledOverride is true", () => {
      const { result } = runTest(UNSTYLED, true)

      expect(result.current.isUnstyled).toBe(true)

      verifyClassNames(result, {
        base: USER_CLASS,
        indicator: USER_CLASS,
        icon: USER_CLASS,
      })
    })

    it("should return default & user classes if unstyledOverride is false", () => {
      const { result } = runTest(UNSTYLED, false)

      expect(result.current.isUnstyled).toBe(false)

      verifyClassNames(result, {
        base: `${DEFAULT_CLASSES.base} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        indicator: `${DEFAULT_CLASSES.indicator} ${USER_CLASS}`,
        icon: `${DEFAULT_CLASSES.icon} ${USER_CLASS}`,
      })
    })
  })
})
