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
        xs: "text-small h-8 px-2",
        sm: "text-small h-9 px-3",
        md: "text-small h-10 px-3.5",
        lg: "text-medium h-11 px-5",
        xl: "text-medium h-12 px-6",
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
