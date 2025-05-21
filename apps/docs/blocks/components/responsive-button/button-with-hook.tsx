"use client"

import { Button } from "@mijn-ui/react-button"
// update import path
import { ButtonVariantProps } from "@mijn-ui/react-theme"
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
      initial: "icon",
      sm: "sm",
      md: "lg",
      lg: "lg",
    },
  })

  const { color, size } = buttonVariants

  return (
    <Button color={color} size={size}>
      {size === "icon" ? "B" : "Button"}
    </Button>
  )
}

export default ButtonWithHook
