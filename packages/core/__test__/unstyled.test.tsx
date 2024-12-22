import { it, expect, describe } from "vitest"
import { applyUnstyled } from "../src/unstyled"

describe("applyUnstyled", () => {
  const DEFAULT_CLASS = "default-classes"
  const USER_CLASS = "user-classes"

  describe("if 'userClasses' are defined", () => {
    it("should return user classes if 'unstyled' is true", () => {
      expect(applyUnstyled(true, DEFAULT_CLASS, USER_CLASS)).toBe(USER_CLASS)
    })

    it("should return default & user classes if 'unstyled' is false", () => {
      expect(applyUnstyled(false, DEFAULT_CLASS, USER_CLASS)).toBe(
        `${DEFAULT_CLASS} ${USER_CLASS}`,
      )
    })

    it("should return default & user classes if 'unstyled' is undefined", () => {
      expect(applyUnstyled(undefined, DEFAULT_CLASS, USER_CLASS)).toBe(
        `${DEFAULT_CLASS} ${USER_CLASS}`,
      )
    })
  })

  describe("if 'userClasses' are not defined", () => {
    it("should return undefined if 'unstyled' is true", () => {
      expect(applyUnstyled(true, DEFAULT_CLASS)).toBe(undefined)
    })

    it("should return default classes if 'unstyled' is false", () => {
      expect(applyUnstyled(false, DEFAULT_CLASS)).toBe(DEFAULT_CLASS)
    })

    it("should return default classes if 'unstyled' is undefined", () => {
      expect(applyUnstyled(undefined, DEFAULT_CLASS)).toBe(DEFAULT_CLASS)
    })
  })
})
