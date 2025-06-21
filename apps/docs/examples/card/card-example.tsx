import { Button } from "@mijn-ui/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mijn-ui/react"
import { ArrowUpRight, Plus } from "lucide-react"

const CardExample = () => {
  return (
    <Card className="relative max-w-60">
      <CardHeader>
        <Button
          variant="ghost"
          iconOnly
          className="rounded-lg bg-accent p-0 text-muted-foreground sm:size-12"
          asChild
        >
          <span>
            <Plus className="size-5 sm:size-6" />
          </span>
        </Button>

        <div className="absolute right-4 top-4 text-muted-foreground">
          <ArrowUpRight className="size-5 sm:size-6" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-base">Users</CardTitle>
        <CardDescription>Manage user accounts and permissions.</CardDescription>
      </CardContent>
    </Card>
  )
}

export default CardExample
