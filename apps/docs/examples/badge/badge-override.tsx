import { Badge } from "@mijn-ui/react"

const BadgeOverride = () => {
  return (
    <Badge
      unstyled
      className="from-primary/20 via-primary/70 to-primary/20 text-tiny hover:shadow-large hover:shadow-primary/20 dark:via-primary/40 dark:to-primary/20 cursor-pointer rounded-full bg-gradient-to-r px-2 py-0.5 font-semibold transition-shadow duration-300 hover:brightness-105 active:scale-95 active:brightness-90"
    >
      Custom Badge
    </Badge>
  )
}

export default BadgeOverride
