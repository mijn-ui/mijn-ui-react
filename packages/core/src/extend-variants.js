/* Adapted From NextUI ❤️ */

import * as React from "react"
import { clsx, tv } from "@mijn-ui/react-theme"

import { mapPropsVariants } from "./map-props-variants"

function getSlots(variants) {
  return variants
    ? Object.values(variants)
        .flatMap(Object.values)
        .reduce((acc, slot) => {
          if (
            typeof slot === "object" &&
            slot !== null &&
            !(slot instanceof String)
          ) {
            Object.keys(slot).forEach((key) => {
              // eslint-disable-next-line no-prototype-builtins
              if (!acc.hasOwnProperty(key)) {
                acc[key] = ""
              }
            })
          }

          return acc
        }, {})
    : {}
}

function getClassNamesWithProps({
  props = {},
  variants,
  slots,
  defaultVariants,
  compoundVariants,
  hasSlots,
  opts,
}) {
  const keys = []

  if (defaultVariants && typeof defaultVariants === "object") {
    for (const key in defaultVariants) {
      const value = defaultVariants[key]
      const propValue = props?.[key]

      if (propValue && propValue !== value) {
        keys.push(key)
      }
    }
  }

  const customTv = tv(
    {
      variants,
      defaultVariants:
        defaultVariants && typeof defaultVariants === "object"
          ? // Do not apply default variants when the props variant is different
            Object.keys(defaultVariants)
              .filter((k) => !keys.includes(k))
              .reduce((o, k) => {
                o[k] = defaultVariants[k]

                return o
              }, [])
          : defaultVariants,
      compoundVariants,
      ...(hasSlots && { slots }),
    },
    {
      twMerge: opts.twMerge ?? true,
      twMergeConfig: opts.twMergeConfig ?? {},
    },
  )

  const [baseProps, variantProps] = mapPropsVariants(
    props,
    customTv.variantKeys,
    false,
  )

  const newProps = { ...defaultVariants, ...baseProps }

  let classNames = {}

  const result = customTv(variantProps)

  // if no slots, the result is a string
  if (!hasSlots) {
    newProps.className = clsx(result, props.className)
  }

  // if has slots, the result is an object with keys as slots functions
  else {
    Object.entries(result).forEach(([key, value]) => {
      const slotResult = value()

      if (typeof slotResult === "string") {
        classNames[key] = slotResult
      }
    })

    Object.entries(props.classNames ?? {}).forEach(([key, value]) => {
      classNames[key] = clsx(classNames[key], value)
    })
  }

  if (Object.keys(classNames).length !== 0) {
    newProps.classNames = classNames
  }

  return newProps
}

export function extendVariants(BaseComponent, styles = {}, opts = {}) {
  const { variants, defaultVariants, compoundVariants } = styles || {}

  const slots = getSlots(variants)
  const hasSlots = typeof slots === "object" && Object.keys(slots).length !== 0

  const Component = (originalProps) => {
    const newProps = getClassNamesWithProps({
      slots,
      variants,
      compoundVariants,
      props: originalProps,
      defaultVariants,
      hasSlots,
      opts,
    })

    return React.createElement(BaseComponent, {
      ...originalProps,
      ...newProps,
    })
  }

  // Add collection node function for collection-based components
  if (BaseComponent.getCollectionNode) {
    Component.getCollectionNode = (itemProps) => {
      const newProps = getClassNamesWithProps({
        slots,
        variants,
        compoundVariants,
        props: itemProps,
        defaultVariants,
        hasSlots,
        opts,
      })

      return BaseComponent.getCollectionNode({ ...itemProps, ...newProps })
    }
  }

  return Component
}
