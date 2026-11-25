/* -------------------------------------------------------------------------- */
import { cn } from "../utils"

/**
 * Creates unstyled slot functions that dynamically adapt to the arguments
 * of the original slot functions provided in `styleSlots`.
 *
 * @template T - A record where values are functions with arbitrary arguments.
 * @param styleSlots - A record of functions defining styles for each slot.
 * @param unstyled - A flag to determine whether to apply unstyled mode.
 *
 * @returns A record of functions with the same arguments as the originals,
 *          plus `className`, applying unstyled logic. Variant props passed
 *          next to `className` (e.g. `content({ position, className })`)
 *          are forwarded to the original slot function.
 */

export const createTVUnstyledSlots = <
  //eslint-disable-next-line
  T extends Record<string, (...args: any[]) => string | undefined>,
>(
  styleSlots: T,
  unstyled?: boolean,
): {
  [K in keyof T]: (...args: Parameters<T[K]>) => string | undefined
} => {
  return Object.keys(styleSlots).reduce(
    (acc, key) => {
      //eslint-disable-next-line
      acc[key as keyof T] = (...args: any[]) => {
        const { slotArgs, userClasses } = splitUserClasses(args)

        // Resolve the slot's own classes (base + variants) without the user
        // classes, then merge them in - or, when unstyled, use only them.
        return applyUnstyled(
          unstyled,
          styleSlots[key as keyof T]?.(...slotArgs) || "",
          userClasses,
        )
      }
      return acc
    },
    {} as { [K in keyof T]: (...args: Parameters<T[K]>) => string | undefined },
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Splits the user classes (`className` and tailwind-variants' `class` alias)
 * off a slot function's props object - its last argument - while keeping
 * every other key, i.e. the slot-level variant props such as `position` or
 * `inset`, so they still reach the tailwind-variants slot function.
 *
 * Arguments without a props object carrying `className`/`class` are returned
 * untouched.
 */
const splitUserClasses = (
  args: unknown[],
): { slotArgs: unknown[]; userClasses: string | undefined } => {
  const lastIndex = args.length - 1
  const lastArg = args[lastIndex]

  if (
    lastArg === null ||
    typeof lastArg !== "object" ||
    !("className" in lastArg || "class" in lastArg)
  ) {
    return { slotArgs: args, userClasses: undefined }
  }

  const {
    className,
    class: classProp,
    ...variantProps
  } = lastArg as Record<string, unknown> & {
    className?: string
    class?: string
  }

  return {
    slotArgs: [...args.slice(0, lastIndex), variantProps],
    userClasses: classProp === undefined ? className : cn(classProp, className),
  }
}

/* -------------------------------------------------------------------------- */

/**
 * Conditionally applies CSS class names based on the `unstyled` flag.
 *
 * When the `unstyled` flag is `true`, only the `userClasses` are applied, effectively bypassing the default styles.
 * If `unstyled` is `false`, both the `defaultClasses` and `userClasses` are combined to apply the full set of styles.
 *
 * @param unstyled - A boolean flag that indicates whether to bypass the default styling. If `true`, only user-defined classes are used.
 * @param defaultClasses - The default Tailwind CSS classes that are applied when `unstyled` is `false`.
 * @param userClasses - Optional additional classes provided by the user. These classes are always added to `defaultClasses`, unless `unstyled` is `true`.
 *
 * @returns A string containing the combined class names or only the `userClasses` if `unstyled` is `true`. If no `userClasses` are provided, the default classes are returned.
 */

export const applyUnstyled = (
  unstyled: boolean | undefined,
  defaultClasses: string,
  userClasses?: string,
): string | undefined => {
  return unstyled ? userClasses : cn(defaultClasses, userClasses)
}
