"use client"

import { Button } from "@mijn-ui/react"
// update import path
import { ButtonVariantProps } from "@mijn-ui/react"
import { useResponsiveVariants } from "./use-responsive-variants"

const ButtonWithHook = () => {
  const buttonVariants = useResponsiveVariants<ButtonVariantProps>({
    color: {
      initial: "primary",
      sm: "secondary",
      md: "danger",
      lg: "danger",
    },
    size: {
      initial: "xs",
      sm: "sm",
      md: "lg",
      lg: "lg",
    },
  })

  const { color, size } = buttonVariants

  return (
    <Button color={color} size={size}>
      Button
    </Button>
  )
}

export default ButtonWithHook
