import { createTVUnstyledSlots } from "./tv-unstyled-slots"

/**
 * A utility hook for managing styled and unstyled variants with the `tailwind-variants` package.
 *
 * @template T - A record of style slots, where each slot is a function returning a class string.
 *
 * @param context - An object containing:
 *  - `unstyled` (optional): A flag to disable default styling and only apply user-defined classes.
 *  - `styles`: A required record of style slots, each slot being a function returning class strings.
 *
 * @param unstyledOverride - Optional override for the `unstyled` flag.
 *
 * @returns An object containing:
 *  - `isUnstyled`: A boolean indicating whether unstyled mode is active.
 *  - Styled slot functions: Functions for each style slot, combining default and user-defined classes
 *    when unstyled mode is off, or only applying user-defined classes otherwise.
 */
export const useTVUnstyled = <
  T extends Record<
    string,
    (options?: { className?: string }) => string | undefined
  >,
>(
  context: { unstyled?: boolean; styles: T },
  unstyledOverride?: boolean,
) => {
  const { unstyled, styles } = context
  const isUnstyled = unstyledOverride ?? unstyled

  const styledFunctions = createTVUnstyledSlots(styles, isUnstyled)

  return {
    isUnstyled,
    ...styledFunctions,
  }
}
