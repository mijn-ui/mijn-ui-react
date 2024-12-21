import { cn } from "@mijn-ui/react-utilities"

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
