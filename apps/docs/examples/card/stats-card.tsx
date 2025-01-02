import { IoBagOutline } from "react-icons/io5"

import { Button } from "@mijn-ui/react-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react-card"

const StatsCardExample = () => {
  return (
    <Card className="max-w-44">
      <CardHeader className="px-5 pb-5 sm:px-6 sm:pb-4">
        <Button
          color="muted"
          size={"icon"}
          className="rounded-full p-0 sm:size-12"
        >
          <IoBagOutline className="size-4 sm:size-5" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 px-5 pb-5 sm:px-6 sm:pb-6">
        <CardDescription>Total Sales</CardDescription>
        <CardTitle className="text-xl font-medium sm:text-2xl">
          $75,890.75
        </CardTitle>
        <p className="text-tiny font-normal text-muted-text">
          <span className="text-success">+128%</span> from June
        </p>
      </CardContent>
    </Card>
  )
}

export default StatsCardExample
