/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Transforms a record of variants into an array of variant objects with formatted options.
 *
 * @template T - A record where keys are variant names and values are objects of key-value pairs.
 * @param variants - The variants object to transform.
 * @returns An array of variant objects, each containing a name and its options.
 *
 * @example
 * const variants = {
 *   size: { small: "value1", large: "value2" },
 *   color: { red: "value1", blue: "value2" },
 * };
 * const result = getVariantObjects(variants);
 * // [
 * //   { name: "size", options: { small: "size-sm", large: "size-lg" } },
 * //   { name: "color", options: { red: "color-red", blue: "color-blue" } },
 * // ]
 */
type VariantValues = Record<string, string>
type VariantObjects<T extends Record<string, VariantValues>> = {
  name: keyof T
  options: VariantValues
}[]

export function getVariantObjects<T extends Record<string, VariantValues>>(
  variants: T,
): VariantObjects<T> {
  const variantsArray: VariantObjects<T> = []

  if (!variants || typeof variants !== "object") return variantsArray

  for (const [variantKey, variantValues] of Object.entries(variants)) {
    const options: VariantValues = {}

    if (variantValues && typeof variantValues === "object") {
      for (const key of Object.keys(variantValues)) {
        options[key] = `${variantKey}-${key}`
      }
    }
    variantsArray.push({ name: variantKey as keyof T, options })
  }

  return variantsArray
}

/**
 * Adds default values to a list of variant objects based on the provided default variants.
 *
 * @template T - A record where keys are variant names and values are objects of key-value pairs.
 * @template D - A record where keys are variant names and values are default keys.
 * @param variantsObj - The array of variant objects to process.
 * @param defaultVariants - A record of default values for each variant name.
 * @returns An array of variant objects with their default values included.
 *
 * @example
 * const variantObjects = [
 *   { name: "size", options: { small: "size-sm", large: "size-lg" } },
 *   { name: "color", options: { red: "color-red", blue: "color-blue" } },
 * ];
 * const defaultVariants = { size: "small", color: "red" };
 * const result = addDefaultValue(variantObjects, defaultVariants);
 * // [
 * //   { name: "size", options: { small: "size-sm", large: "size-lg" }, defaultOption: "size-sm" },
 * //   { name: "color", options: { red: "color-red", blue: "color-blue" }, defaultOption: "color-red" },
 * // ]
 */
export function addDefaultValue<
  T extends Record<string, VariantValues>,
  D extends Record<string, any>,
>(variantsObj: VariantObjects<T>, defaultVariants: D) {
  return variantsObj.map((variant) => {
    const defaultVariantKey = defaultVariants[variant.name as string]
    const defaultOption = defaultVariantKey
      ? variant.options[`${defaultVariantKey}`]
      : Object.values(variant.options)[0]

    return {
      name: variant.name,
      options: variant.options,
      defaultOption,
    }
  })
}

/**
 * Combines `getVariantObjects` and `addDefaultValue` into a single function.
 *
 * @template T - A record where keys are variant names and values are objects of key-value pairs.
 * @template D - A record where keys are variant names and values are default keys.
 * @param variants - The variants object to process.
 * @param defaultVariants - A record of default values for each variant name.
 * @returns An array of variant objects with their default values included.
 *
 * @example
 * const variants = {
 *   size: { small: "value1", large: "value2" },
 *   color: { red: "value1", blue: "value2" },
 * };
 * const defaultVariants = { size: "small", color: "red" };
 * const result = createVariantWithDefaults(variants, defaultVariants);
 * // [
 * //   { name: "size", options: { small: "size-sm", large: "size-lg" }, defaultOption: "size-sm" },
 * //   { name: "color", options: { red: "color-red", blue: "color-blue" }, defaultOption: "color-red" },
 * // ]
 */

export function createVariantObjWithDefaults<
  T extends Record<string, VariantValues>,
  D extends Record<string, string | any>,
>(variants: T, defaultVariants: D) {
  const variantObjects = getVariantObjects(variants)
  return addDefaultValue(variantObjects, defaultVariants)
}
