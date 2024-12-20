import { it, expect, describe } from "vitest"
import { applyUnstyled } from "../src/unstyled"

describe("applyUnstyled", () => {
  describe("if 'userClasses' are defined", () => {
    it("should return user classes if 'unstyled' is true", () => {
      expect(applyUnstyled(true, "default-classes", "user-classes")).toBe(
        "user-classes",
      )
    })

    it("should return default & user classes if 'unstyled' is false", () => {
      expect(applyUnstyled(false, "default-classes", "user-classes")).toBe(
        "default-classes user-classes",
      )
    })

    it("should return default & user classes if 'unstyled' is undefined", () => {
      expect(applyUnstyled(undefined, "default-classes", "user-classes")).toBe(
        "default-classes user-classes",
      )
    })
  })

  describe("if 'userClasses' are not defined", () => {
    it("should return undefined if 'unstyled' is true", () => {
      expect(applyUnstyled(true, "default-classes")).toBe(undefined)
    })

    it("should return default classes if 'unstyled' is false", () => {
      expect(applyUnstyled(false, "default-classes")).toBe("default-classes")
    })

    it("should return default classes if 'unstyled' is undefined", () => {
      expect(applyUnstyled(undefined, "default-classes")).toBe(
        "default-classes",
      )
    })
  })
})
