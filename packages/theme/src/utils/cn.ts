import type { ClassValue } from "clsx"
import clsx from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
import { twMergeConfig } from "./tw-merge-config"

/**
 * We need to extend the tailwind merge to include MijnUI's custom classes.
 *
 * So we can use classes like `text-sm` or `text-default-500` and override them.
 */
const twMerge = extendTailwindMerge({ extend: twMergeConfig })

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { clsx }
