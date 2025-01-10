import { Button, ButtonProps } from "@mijn-ui/react"
import {
  ButtonVariantProps,
  VariantProps,
  buttonStyles,
  tv,
} from "@mijn-ui/react"

const responsiveButton = tv(
  {
    extend: buttonStyles,
    variants: {
      size: {
        xs: "h-8 px-2 text-small",
        sm: "h-9 px-3 text-small",
        md: "h-10 px-3.5 text-small",
        lg: "h-11 px-5 text-medium",
        xl: "h-12 px-6 text-medium",
      },
    },
  },
  {
    responsiveVariants: true, // `true` to apply to all screen sizes
  },
)
const TVResponsiveButton = ({
  size,
  variant,
  radius,
  color,
  iconOnly,
  classNames,
  ...props
}: Omit<ButtonProps, keyof ButtonVariantProps> &
  VariantProps<typeof responsiveButton>) => {
  const styles = responsiveButton({ color, size, variant, radius, iconOnly })

  return (
    <Button
      classNames={{
        base: styles.base({ className: classNames?.base }),
        icon: styles.icon({ className: classNames?.icon }),
      }}
      {...props}
      unstyled // [!code highlight] Set unstyled to true to avoid default classes, as we are extending with tailwind variants.
    />
  )
}

export { TVResponsiveButton }
