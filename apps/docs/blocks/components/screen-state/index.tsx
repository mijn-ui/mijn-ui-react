import React from "react"

import { FaBoxArchive } from "react-icons/fa6"

import { Button } from "@mijn-ui/react-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react-card"

interface ScreenStateProps {
  title: string
  description: string
  onCancel: () => void
  onCreate: () => void
}

const ScreenState: React.FC<ScreenStateProps> = ({
  title,
  description,
  onCancel,
  onCreate,
}) => {
  return (
    <Card className="flex w-full max-w-screen-sm flex-col items-center justify-center space-y-3 rounded-2xl bg-surface p-6 text-center sm:space-y-6">
      <CardHeader className="p-0">
        <FaBoxArchive className="size-10 text-main-text sm:size-12" />
      </CardHeader>
      <CardContent unstyled className="space-y-1">
        <CardTitle
          unstyled
          className="text-large font-medium text-main-text sm:text-xl"
        >
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>

      <CardFooter className="gap-3">
        <Button
          className="h-9 sm:h-10"
          color="muted"
          variant={"outlined"}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="h-9 sm:h-10" onClick={onCreate}>
          Create New File
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ScreenState
