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
        sm: "h-9 w-fit px-3",
        md: "h-10 w-fit px-3",
        lg: "h-11 w-fit px-8",
        icon: "size-10",
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
  classNames,
  ...props
}: Omit<ButtonProps, keyof ButtonVariantProps> &
  VariantProps<typeof responsiveButton>) => {
  const styles = responsiveButton({ color, size, variant, radius })

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
