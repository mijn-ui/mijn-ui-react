import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...classes: ClassValue[]) => twMerge(clsx(classes))
export { clsx, cn }
