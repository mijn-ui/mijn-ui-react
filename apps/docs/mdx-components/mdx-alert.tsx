import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Alert as MijnUIAlert,
} from "@mijn-ui/react-alert"
import { AlertVariantProps } from "@mijn-ui/react-theme"
import { cn } from "@mijn-ui/react-utilities"
import { LuBug } from "react-icons/lu"
import { CiCircleAlert } from "react-icons/ci"

type AlertProps = {
  title: string
  description: string
  color?: AlertVariantProps["color"]
  className?: string
}

const Alert = ({
  title,
  description,
  color = "info",
  className,
}: AlertProps) => {
  const Icon = color === "danger" ? LuBug : CiCircleAlert

  return (
    <MijnUIAlert
      className={cn("not-prose w-full backdrop-blur-md", className)}
      variant="subtle"
      color={color}
    >
      <AlertIcon>
        <Icon />
      </AlertIcon>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </MijnUIAlert>
  )
}

export default Alert
