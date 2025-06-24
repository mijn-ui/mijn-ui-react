/**
 * This is the base classNames for all elements.
 * Is meant to be used with the `addBase` method from tailwindcss.
 */
export const baseStyles = (prefix: string) => ({
  color: `hsl(var(--${prefix}-foreground))`,
  backgroundColor: `hsl(var(--${prefix}-background))`,
  borderColor: `hsl(var(--${prefix}-border))`,
})

export const disabledClasses = [
  "disabled:pointer-events-none",
  "disabled:opacity-50",
]

export const dataDisabledClasses = [
  "data-[disabled]:pointer-events-none",
  "data-[disabled]:opacity-50",
]

export const focusVisibleClasses = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-primary",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
]

export const focusVisibleBaseClasses = [
  "outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
]

export const focusVisiblePrimary = [
  ...focusVisibleBaseClasses,
  "focus-visible:ring-primary",
]

export const focusVisibleSuccess = [
  ...focusVisibleBaseClasses,
  "focus-visible:ring-success",
]

export const focusVisibleWarning = [
  ...focusVisibleBaseClasses,
  "focus-visible:ring-warning",
]

export const focusVisibleDanger = [
  ...focusVisibleBaseClasses,
  "focus-visible:ring-danger",
]

export const focusVisibleInverse = [
  ...focusVisibleBaseClasses,
  "focus-visible:ring-inverse",
]

/* ------------------------------- Animations ------------------------------- */

export const dialogOverlayClasses = [
  "fixed inset-0 z-50 bg-black/80",
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
  "data-[state=open]:zoom-in-95 data-[state=open]:animate-in data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  "data-[side=bottom]:slide-in-from-bottom-6 data-[side=left]:slide-in-from-left-6 data-[side=right]:slide-in-from-right-6 data-[side=top]:slide-in-from-top-6",
]
