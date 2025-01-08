import React from "react"
import { cn } from "@mijn-ui/react"

const LeftRadialGradient = ({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        ...style,
        backgroundImage:
          "radial-gradient(130% 60% at 0% 50%, rgba(239, 138, 94, 0.1), rgba(255, 255, 255, 0))",
      }}
      {...props}
    />
  )
}

const TopRightRadialGradient = ({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("absolute inset-0 -z-10", className)}
      style={{
        ...style,
        backgroundImage:
          "radial-gradient(60% 100% at 100% 10%, rgba(239, 138, 94, 0.1), rgba(255, 255, 255, 0))",
      }}
      {...props}
    />
  )
}

export { LeftRadialGradient, TopRightRadialGradient }
