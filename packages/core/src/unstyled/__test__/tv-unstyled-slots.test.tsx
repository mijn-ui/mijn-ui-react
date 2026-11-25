import { tv } from "tailwind-variants"
import { describe, expect, it } from "vitest"
import { createTVUnstyledSlots } from "../tv-unstyled-slots"

describe("createTVUnstyledSlots", () => {
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

  const verifyClassNames = (
    slotFns: ReturnType<typeof createTVUnstyledSlots>,
    expectedClasses: Record<string, string>,
  ) => {
    Object.entries(expectedClasses).forEach(([slot, expectedClass]) => {
      expect(slotFns[slot]({ className: USER_CLASS })).toBe(expectedClass)
    })
  }

  describe("if variant slots are explicitly defined", () => {
    const componentStyles = tv({
      slots: {
        base: DEFAULT_CLASSES.base,
        icon: DEFAULT_CLASSES.icon,
        indicator: DEFAULT_CLASSES.indicator,
      },
      variants: {
        color: {
          primary: {
            base: VARIANTS.color.primary,
            icon: VARIANTS.color.primary,
            indicator: VARIANTS.color.primary,
          },
          secondary: {
            base: VARIANTS.color.secondary,
            icon: VARIANTS.color.secondary,
            indicator: VARIANTS.color.secondary,
          },
          accent: {
            base: VARIANTS.color.accent,
            icon: VARIANTS.color.accent,
            indicator: VARIANTS.color.accent,
          },
        },
        size: {
          sm: {
            base: VARIANTS.size.sm,
            icon: VARIANTS.size.sm,
            indicator: VARIANTS.size.sm,
          },
          md: {
            base: VARIANTS.size.md,
            icon: VARIANTS.size.md,
            indicator: VARIANTS.size.md,
          },
          lg: {
            base: VARIANTS.size.lg,
            icon: VARIANTS.size.lg,
            indicator: VARIANTS.size.lg,
          },
        },
      },
      defaultVariants: DEFAULT_VARIANTS,
    })

    const styles = componentStyles({
      color: "secondary",
      size: "lg",
    })

    it("should return default & user classes if unstyled is false", () => {
      verifyClassNames(createTVUnstyledSlots(styles, false), {
        base: `${DEFAULT_CLASSES.base} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        indicator: `${DEFAULT_CLASSES.indicator} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        icon: `${DEFAULT_CLASSES.icon} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
      })
    })

    it("should return default & user classes if unstyled is undefined", () => {
      verifyClassNames(createTVUnstyledSlots(styles), {
        base: `${DEFAULT_CLASSES.base} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        indicator: `${DEFAULT_CLASSES.indicator} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        icon: `${DEFAULT_CLASSES.icon} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
      })
    })

    it("should return user classes if unstyled is true", () => {
      verifyClassNames(createTVUnstyledSlots(styles, true), {
        base: `${USER_CLASS}`,
        indicator: `${USER_CLASS}`,
        icon: `${USER_CLASS}`,
      })
    })
  })

  describe("if variant slots are not explicitly defined", () => {
    const componentStyles = tv({
      slots: {
        base: DEFAULT_CLASSES.base,
        icon: DEFAULT_CLASSES.icon,
        indicator: DEFAULT_CLASSES.indicator,
      },
      variants: VARIANTS,
      defaultVariants: {
        color: "primary",
        size: "md",
      },
    })

    const styles = componentStyles({
      color: "secondary",
      size: "lg",
    })

    it("should return default & user classes if unstyled is false", () => {
      verifyClassNames(createTVUnstyledSlots(styles, false), {
        base: `${DEFAULT_CLASSES.base} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        indicator: `${DEFAULT_CLASSES.indicator} ${USER_CLASS}`,
        icon: `${DEFAULT_CLASSES.icon} ${USER_CLASS}`,
      })
    })

    it("should return default & user classes if unstyled is undefined", () => {
      verifyClassNames(createTVUnstyledSlots(styles), {
        base: `${DEFAULT_CLASSES.base} ${VARIANTS.color.secondary} ${VARIANTS.size.lg} ${USER_CLASS}`,
        indicator: `${DEFAULT_CLASSES.indicator} ${USER_CLASS}`,
        icon: `${DEFAULT_CLASSES.icon} ${USER_CLASS}`,
      })
    })

    it("should return user classes if unstyled is true", () => {
      verifyClassNames(createTVUnstyledSlots(styles, true), {
        base: `${USER_CLASS}`,
        indicator: `${USER_CLASS}`,
        icon: `${USER_CLASS}`,
      })
    })
  })

  // Regression: slot functions are usually called with variant props *and* a
  // `className` in the same object, e.g. Select's `content({ position, className })`
  // or DropdownMenu's `item({ inset, className })`. The variant props used to be
  // dropped whenever `className` was non-empty.
  describe("if variant props are passed to the slot function", () => {
    const POPPER = "translate-y-1"
    const INSET = "pl-8"

    const componentStyles = tv({
      slots: {
        content: "w-60 rounded-md",
        item: "flex px-2",
      },
      variants: {
        position: {
          popper: { content: POPPER },
          "item-aligned": {},
        },
        inset: {
          true: { item: INSET },
        },
      },
    })

    const styles = componentStyles()

    it("should keep variant classes when className is passed", () => {
      const { content, item } = createTVUnstyledSlots(styles)

      expect(content({ position: "popper", className: USER_CLASS })).toBe(
        `w-60 rounded-md ${POPPER} ${USER_CLASS}`,
      )
      expect(item({ inset: true, className: USER_CLASS })).toBe(
        `flex px-2 ${INSET} ${USER_CLASS}`,
      )
    })

    it("should keep variant classes regardless of key order", () => {
      const { content } = createTVUnstyledSlots(styles, false)

      expect(content({ className: USER_CLASS, position: "popper" })).toBe(
        `w-60 rounded-md ${POPPER} ${USER_CLASS}`,
      )
    })

    it("should produce the same variant classes with and without className", () => {
      const { content, item } = createTVUnstyledSlots(styles)

      expect(content({ position: "popper" })).toBe(`w-60 rounded-md ${POPPER}`)
      expect(content({ position: "popper", className: "" })).toBe(
        `w-60 rounded-md ${POPPER}`,
      )
      expect(item({ inset: true, className: undefined })).toBe(
        `flex px-2 ${INSET}`,
      )
    })

    it("should let className override a conflicting variant class", () => {
      const { item } = createTVUnstyledSlots(styles)

      expect(item({ inset: true, className: "pl-2" })).toBe("flex px-2 pl-2")
    })

    it("should treat `class` like `className`", () => {
      const { content } = createTVUnstyledSlots(styles)

      expect(content({ position: "popper", class: USER_CLASS })).toBe(
        `w-60 rounded-md ${POPPER} ${USER_CLASS}`,
      )
    })

    it("should strip default and variant classes if unstyled is true", () => {
      const { content, item } = createTVUnstyledSlots(styles, true)

      expect(content({ position: "popper", className: USER_CLASS })).toBe(
        USER_CLASS,
      )
      expect(item({ inset: true, className: USER_CLASS })).toBe(USER_CLASS)
      expect(content({ position: "popper", class: USER_CLASS })).toBe(
        USER_CLASS,
      )
      expect(item({ inset: true })).toBe(undefined)
    })
  })
})
