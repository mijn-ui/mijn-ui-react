import { ClassValue } from "tailwind-variants"

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
export type SlotsToClasses<S extends string> = {
  [key in S]?: ClassValue
}

/**
 *
 * Type for components that can be unstyled.
 */
export type UnstyledProps = {
  unstyled?: boolean
}
