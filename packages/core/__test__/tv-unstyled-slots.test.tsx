import { it, expect, describe } from "vitest"
import { tv } from "tailwind-variants"
import { createTVUnstyledSlots } from "../src/tv-unstyled-slots"

describe("createTVUnstyledSlots", () => {
  const baseDefault = "rounded-md"
  const iconDefault = "p-4"
  const indicatorDefault = "border-solid"

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  }

  const sizeClasses = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
  }

  const userClass = "user-classes"

  describe("if variant slots are explicitly defined", () => {
    const componentStyles = tv({
      slots: {
        base: baseDefault,
        icon: iconDefault,
        indicator: indicatorDefault,
      },
      variants: {
        color: {
          primary: {
            base: colorClasses.primary,
            icon: colorClasses.primary,
            indicator: colorClasses.primary,
          },
          secondary: {
            base: colorClasses.secondary,
            icon: colorClasses.secondary,
            indicator: colorClasses.secondary,
          },
          accent: {
            base: colorClasses.accent,
            icon: colorClasses.accent,
            indicator: colorClasses.accent,
          },
        },
        size: {
          sm: {
            base: sizeClasses.sm,
            icon: sizeClasses.sm,
            indicator: sizeClasses.sm,
          },
          md: {
            base: sizeClasses.md,
            icon: sizeClasses.md,
            indicator: sizeClasses.md,
          },
          lg: {
            base: sizeClasses.lg,
            icon: sizeClasses.lg,
            indicator: sizeClasses.lg,
          },
        },
      },
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
      const { base, indicator, icon } = createTVUnstyledSlots(styles, false)

      expect(base({ className: userClass })).toBe(
        `${baseDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
      expect(icon({ className: userClass })).toBe(
        `${iconDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
      expect(indicator({ className: userClass })).toBe(
        `${indicatorDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
    })

    it("should return default & user classes if unstyled is undefined", () => {
      const { base, indicator, icon } = createTVUnstyledSlots(styles, undefined)

      expect(base({ className: userClass })).toBe(
        `${baseDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
      expect(icon({ className: userClass })).toBe(
        `${iconDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
      expect(indicator({ className: userClass })).toBe(
        `${indicatorDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
    })

    it("should return user classes if unstyled is true", () => {
      const { base, indicator, icon } = createTVUnstyledSlots(styles, true)

      expect(base({ className: userClass })).toBe(userClass)
      expect(icon({ className: userClass })).toBe(userClass)
      expect(indicator({ className: userClass })).toBe(userClass)
    })
  })

  describe("if variant slots are not explicitly defined", () => {
    const componentStyles = tv({
      slots: {
        base: baseDefault,
        icon: iconDefault,
        indicator: indicatorDefault,
      },
      variants: {
        color: colorClasses,
        size: sizeClasses,
      },
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
      const { base, indicator, icon } = createTVUnstyledSlots(styles, false)

      expect(base({ className: userClass })).toBe(
        `${baseDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
      expect(icon({ className: userClass })).toBe(`${iconDefault} ${userClass}`)
      expect(indicator({ className: userClass })).toBe(
        `${indicatorDefault} ${userClass}`,
      )
    })

    it("should return default & user classes if unstyled is undefined", () => {
      const { base, indicator, icon } = createTVUnstyledSlots(styles, undefined)

      expect(base({ className: userClass })).toBe(
        `${baseDefault} ${colorClasses.secondary} ${sizeClasses.lg} ${userClass}`,
      )
      expect(icon({ className: userClass })).toBe(`${iconDefault} ${userClass}`)
      expect(indicator({ className: userClass })).toBe(
        `${indicatorDefault} ${userClass}`,
      )
    })

    it("should return user classes if unstyled is true", () => {
      const { base, indicator, icon } = createTVUnstyledSlots(styles, true)

      expect(base({ className: userClass })).toBe(userClass)
      expect(icon({ className: userClass })).toBe(userClass)
      expect(indicator({ className: userClass })).toBe(userClass)
    })
  })
})
