import { describe, expectTypeOf, it } from "vitest"
import type { AvatarGroupSlots } from "./avatar"

describe("Avatar types", () => {
  it("keeps AvatarGroupSlots to the two group slots", () => {
    expectTypeOf<AvatarGroupSlots>().toEqualTypeOf<
      "group" | "groupRemainChildren"
    >()
  })
})
