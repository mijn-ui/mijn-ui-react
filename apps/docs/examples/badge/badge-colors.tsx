import { Badge } from "@mijn-ui/react"

const BadgeColors = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge color="default">Default</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="secondary">Secondary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="danger">Danger</Badge>
    </div>
  )
}

export default BadgeColors
