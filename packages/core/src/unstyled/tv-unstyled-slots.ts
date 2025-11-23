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
 *          plus `className`, applying unstyled logic.
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
        // Extract the last argument if it includes `className`
        const lastArg = args[args.length - 1]
        const className = lastArg?.className

        // Remove the `className` from the arguments to pass to the original function
        const argsWithoutClassName = className ? args.slice(0, -1) : args

        // Call the original function and merge styles
        return applyUnstyled(
          unstyled,
          styleSlots[key as keyof T]?.(...argsWithoutClassName) || "",
          className,
        )
      }
      return acc
    },
    {} as { [K in keyof T]: (...args: Parameters<T[K]>) => string | undefined },
  )
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
