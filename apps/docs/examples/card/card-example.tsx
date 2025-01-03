import { LuArrowUpRight, LuPlus } from "react-icons/lu"

import { Button } from "@mijn-ui/react-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react-card"

const CardExample = () => {
  return (
    <Card className="relative max-w-60">
      <CardHeader>
        <Button
          variant="ghost"
          size={"icon"}
          className="rounded-large bg-accent p-0 text-muted-foreground sm:size-12"
          asChild
        >
          <span>
            <LuPlus className="size-5 sm:size-6" />
          </span>
        </Button>

        <div className="absolute right-4 top-4 text-muted-foreground">
          <LuArrowUpRight className="size-5 sm:size-6" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-medium">Users</CardTitle>
        <CardDescription>Manage user accounts and permissions.</CardDescription>
      </CardContent>
    </Card>
  )
}

export default CardExample
