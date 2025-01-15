import { Badge } from "@mijn-ui/react"

const BadgeRadius = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge radius="sm">Badge</Badge>
      <Badge radius="md">Badge</Badge>
      <Badge radius="lg">Badge</Badge>
      <Badge radius="full">Badge</Badge>
    </div>
  )
}

export default BadgeRadius
