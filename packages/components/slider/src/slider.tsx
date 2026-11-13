"use client"

import * as React from "react"
import {
  UnstyledComponentWithSlots,
  cn,
  createTVUnstyledSlots,
} from "@mijn-ui/react-core"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { VariantProps, tv } from "tailwind-variants"

const sliderStyles = tv({
  slots: {
    base: [
      "relative flex w-full touch-none select-none items-center",
      "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    ],
    track: [
      "bg-bg-tertiary relative grow overflow-hidden rounded-full",
      "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
      "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
    ],
    range: [
      "bg-bg-brand absolute",
      "data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
    ],
    thumb: [
      "border-outline-brand bg-bg-default block size-4 shrink-0 rounded-full border shadow-sm transition-colors",
      "focus-visible:ring-outline-brand focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default focus-visible:outline-none",
      "hover:bg-bg-secondary disabled:pointer-events-none disabled:opacity-50",
    ],
  },
})

export type SliderVariantProps = VariantProps<typeof sliderStyles>
export type SliderSlots = keyof ReturnType<typeof sliderStyles>

export { sliderStyles }

/* -------------------------------------------------------------------------- */

export type SliderProps = UnstyledComponentWithSlots<SliderSlots> &
  React.ComponentPropsWithRef<typeof SliderPrimitive.Root> & {
    /**
     * Accessible name for each thumb, in order.
     *
     * A range slider renders one thumb per value and each is its own
     * `role="slider"`, so a single name on the root cannot describe them —
     * without this, a two-thumb slider announces twice as the same control.
     */
    thumbAriaLabels?: string[]
  }

const Slider = ({
  className,
  classNames,
  unstyled,
  value,
  defaultValue,
  min = 0,
  max = 100,
  thumbAriaLabels,
  ref,
  ...props
}: SliderProps) => {
  const { base, track, range, thumb } = createTVUnstyledSlots(
    sliderStyles(),
    unstyled,
  )

  // One thumb per value. Radix falls back to a single thumb at `min` when
  // neither `value` nor `defaultValue` is given.
  const thumbValues = React.useMemo(
    () => value ?? defaultValue ?? [min],
    [value, defaultValue, min],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={base({ className: cn(classNames?.base, className) })}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={track({ className: classNames?.track })}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={range({ className: classNames?.range })}
        />
      </SliderPrimitive.Track>
      {thumbValues.map((_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          aria-label={thumbAriaLabels?.[index]}
          className={thumb({ className: classNames?.thumb })}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
