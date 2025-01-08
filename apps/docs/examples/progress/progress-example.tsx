"use client"

import * as React from "react"
import { Progress } from "@mijn-ui/react"

const ProgressExample = () => {
  const [value, setValue] = React.useState<number>(0)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    intervalRef.current = setInterval(() => {
      setValue((val) => {
        if (val >= 75) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
          }
          return val
        }
        return val + 1
      })
    }, 20)

    // Clear the interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="w-80 space-y-1">
      <div className="flex items-center justify-between text-small font-medium text-foreground">
        <h5>Progress Label</h5>
        <p>{value}%</p>
      </div>
      <Progress value={value} />
      <div className="flex items-center justify-between text-tiny text-muted-foreground">
        <p>min</p>
        <p>max</p>
      </div>
    </div>
  )
}

export default ProgressExample
