import { ReactNode } from "react"
import {
  AlertIcon,
  AlertTitle,
  Alert as MijnUIAlert,
} from "@mijn-ui/react-alert"
import { AlertVariantProps, alertStyles, cn } from "@mijn-ui/react-theme"
import { FiAlertCircle } from "react-icons/fi"

type AlertProps = {
  title?: ReactNode
  color?: AlertVariantProps["color"]
  variant?: AlertVariantProps["variant"]
  className?: string
  children: ReactNode
}

const Alert = ({ title, children, color, variant, className }: AlertProps) => {
  return (
    <MijnUIAlert
      className={cn("w-full backdrop-blur-md", className)}
      variant={variant}
      color={color}
    >
      <AlertIcon>
        <FiAlertCircle />
      </AlertIcon>
      <AlertTitle>{title}</AlertTitle>
      <div
        className={cn(
          alertStyles().description({ className: "[&>*]:!my-0" }),
          !title && "mt-0",
        )}
      >
        {children}
      </div>
    </MijnUIAlert>
  )
}

export default Alert
