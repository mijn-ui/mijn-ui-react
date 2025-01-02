/* eslint-disable */

/**
 * Creates an object composed of the own and inherited enumerable property paths of `obj` that are not omitted.
 *
 * @param obj - The source object.
 * @param keys - The property keys to omit.
 *
 * @returns A new object with the keys specified omitted.
 *
 * @typeParam Obj - The type of the object.
 * @typeParam Keys - The type of the keys to omit.
 *
 * @example
 * omit({ a: 1, b: '2', c: 3 }, ['a', 'c']); // returns { b: '2' }
 */
export const omit = <Obj, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[],
): Omit<Obj, Keys> => {
  const res = Object.assign({}, obj)

  keys.forEach((key) => {
    delete res[key]
  })

  return res
}

/**
 * Converts a string to kebab-case.
 *
 * @param s - The string to convert.
 *
 * @returns The kebab-case version of the string.
 *
 * @example
 * kebabCase('fooBar'); // returns 'foo-bar'
 */

export const kebabCase = (s: string) => {
  return s.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

/**
 * Creates an object with keys transformed using provided `iteratee` function, which takes each value and the corresponding key.
 *
 * @param obj - The source object.
 * @param iteratee - The function invoked per iteration to transform the keys.
 *
 * @returns A new object with keys transformed by `iteratee`.
 *
 * @example
 * mapKeys({ a: 1, b: 2 }, (value, key) => key + value); // returns { a1: 1, b2: 2 }
 */
export const mapKeys = (
  obj: Record<string, any>,
  iteratee: (value: any, key: string) => any,
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [iteratee(value, key), value]),
  )
}

/**
 * Merges multiple React refs into a single ref callback.
 * The merged ref callback can be used to assign a value to multiple refs simultaneously.
 *
 * @template T - The type of the ref value.
 * @param refs - An array of React refs to be merged.
 * @returns A ref callback that assigns a value to all the merged refs.
 */
export function mergeRefs<T>(
  refs: Array<React.Ref<T> | undefined | null>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value)
      } else if (ref && "current" in ref) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
