import { describe, expect, it } from "vitest"

import { tv } from "@mijn-ui/react-theme"

import { createTVUnstyledSlots } from "../src/tv-unstyled-slots"

describe("createTVUnstyledSlots", () => {
  // Constants for default classes
  const DEFAULT_CLASSES = {
    base: "rounded-medium",
    icon: "p-4",
    indicator: "border-solid",
  }

  // Constants for variants
  const VARIANTS = {
    color: {
      primary: "bg-primary",
      secondary: "bg-secondary",
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
})
