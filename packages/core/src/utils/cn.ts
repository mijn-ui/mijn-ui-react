import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-variants"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
