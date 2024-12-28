import { Badge } from "@mijn-ui/react-badge"

const BadgeOverride = () => {
  return (
    <Badge
      unstyled
      className="cursor-pointer rounded-full bg-gradient-to-r from-primary/20 via-primary/70 to-primary/20 px-2 py-0.5 text-xs font-semibold transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20 hover:brightness-105 active:scale-95 active:brightness-90 dark:via-primary/40 dark:to-primary/20"
    >
      Custom Badge
    </Badge>
  )
}

export default BadgeOverride
