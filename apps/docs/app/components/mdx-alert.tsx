import { ReactNode } from "react"

import { FiAlertCircle } from "react-icons/fi"
import { LuBug } from "react-icons/lu"

import {
  Alert as MijnUIAlert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@mijn-ui/react-alert"
import { AlertVariantProps, cn } from "@mijn-ui/react-theme"

type AlertProps = {
  title: ReactNode
  description: ReactNode
  color?: AlertVariantProps["color"]
  variant?: AlertVariantProps["variant"]
  className?: string
}

const Alert = ({
  title,
  description,
  color,
  variant,
  className,
}: AlertProps) => {
  const Icon = color === "danger" ? LuBug : FiAlertCircle

  return (
    <MijnUIAlert
      className={cn("not-prose w-full backdrop-blur-md", className)}
      variant={variant}
      color={color}
    >
      <AlertIcon>
        <Icon />
      </AlertIcon>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className={cn(!title && "mt-0")}>
        {description}
      </AlertDescription>
    </MijnUIAlert>
  )
}

export default Alert
