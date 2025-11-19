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
