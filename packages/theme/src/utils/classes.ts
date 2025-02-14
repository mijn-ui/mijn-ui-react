/**
 * This is the base classNames for all elements.
 * Is meant to be used with the `addBase` method from tailwindcss.
 */
export const baseStyles = (prefix: string) => ({
  color: `hsl(var(--${prefix}-foreground))`,
  backgroundColor: `hsl(var(--${prefix}-background))`,
})

export const disabledClasses = [
  "disabled:pointer-events-none",
  "disabled:opacity-disabled",
]

export const dataDisabledClasses = [
  "data-[disabled]:pointer-events-none",
  "data-[disabled]:opacity-disabled",
]

export const focusVisibleClasses = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
]

/* ------------------------------- Animations ------------------------------- */

export const dialogOverlayClasses = [
  "fixed inset-0 z-50 bg-overlay/80",
  "data-[state=open]:animate-in data-[state=open]:fade-in-0",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
]

export const dialogContentAnimationClasses = [
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-90",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0  data-[state=closed]:zoom-out-90 ",
]

export const popupSubAnimationClasses = [
  "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
  "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
]

export const popupAnimationClasses = [
  "data-[state=open]:zoom-in-95 data-[state=open]:animate-in  data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6",
]
