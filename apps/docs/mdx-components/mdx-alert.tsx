import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Alert as MijnUIAlert,
} from "@mijn-ui/react-alert"
import { AlertVariantProps } from "@mijn-ui/react-theme"
import { cn } from "@mijn-ui/react-utilities"
import { LuBug } from "react-icons/lu"
import { FiAlertCircle } from "react-icons/fi"
import { ReactNode } from "react"

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
