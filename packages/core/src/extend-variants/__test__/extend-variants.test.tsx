import * as React from "react"
import { cleanup, render } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { extendVariants } from "../extend-variants"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extend = extendVariants as any

const Box = ({ className, ...rest }: { className?: string }) => (
  <div data-testid="box" className={className} {...rest} />
)

type SlotProps = { classNames?: { base?: string; icon?: string } }

const Slotted = ({ classNames }: SlotProps) => (
  <div data-testid="base" className={classNames?.base}>
    <span data-testid="icon" className={classNames?.icon} />
  </div>
)

describe("extendVariants", () => {
  afterEach(cleanup)

  describe("without slots", () => {
    const Extended = extend(Box, {
      variants: { size: { wide: "px-4 text-lg" } },
    })

    it("renders the classes of the chosen variant", () => {
      const { getByTestId } = render(<Extended size="wide" />)

      expect(getByTestId("box").className).toBe("px-4 text-lg")
    })

    // The caller's own `className` is joined with clsx, outside the merge.
    it("joins the caller's className without merging it", () => {
      const Padded = extend(Box, { variants: { size: { wide: "p-4" } } })
      const { getByTestId } = render(<Padded size="wide" className="p-2" />)

      expect(getByTestId("box").className).toBe("p-4 p-2")
    })

    // Merging happens between the variant, default and compound classes.
    it("merges conflicting classes, the later one wins", () => {
      const Merged = extend(Box, {
        variants: { size: { wide: "px-2" }, tone: { loud: "font-bold" } },
        compoundVariants: [{ size: "wide", tone: "loud", class: "px-4" }],
      })
      const { getByTestId } = render(<Merged size="wide" tone="loud" />)

      expect(getByTestId("box").className).toBe("font-bold px-4")
    })
  })

  describe("with slots", () => {
    const Extended = extend(Slotted, {
      variants: {
        tone: {
          loud: { base: "p-4 font-bold", icon: "size-6" },
        },
      },
    })

    it("maps each slot to its classNames entry", () => {
      const { getByTestId } = render(<Extended tone="loud" />)

      expect(getByTestId("base").className).toBe("p-4 font-bold")
      expect(getByTestId("icon").className).toBe("size-6")
    })

    it("merges classNames passed by the caller", () => {
      const { getByTestId } = render(
        <Extended tone="loud" classNames={{ base: "p-2" }} />,
      )

      // Joined with clsx, not merged: the caller's `p-2` sits next to `p-4`.
      expect(getByTestId("base").className).toBe("p-4 font-bold p-2")
    })
  })

  describe("twMergeConfig", () => {
    it("throws at definition time when twMergeConfig is passed", () => {
      expect(() =>
        extend(
          Box,
          { variants: { size: { wide: "px-4" } } },
          { twMergeConfig: { extend: { classGroups: {} } } },
        ),
      ).toThrow(/twMergeConfig/)
    })
  })
})
