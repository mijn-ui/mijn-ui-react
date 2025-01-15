import { Badge } from "@mijn-ui/react"

const BadgeGhost = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="ghost" color="default">
        Default
      </Badge>
      <Badge variant="ghost" color="primary">
        Primary
      </Badge>
      <Badge variant="ghost" color="secondary">
        Secondary
      </Badge>
      <Badge variant="ghost" color="success">
        Success
      </Badge>
      <Badge variant="ghost" color="info">
        Info
      </Badge>
      <Badge variant="ghost" color="warning">
        Warning
      </Badge>
      <Badge variant="ghost" color="danger">
        Danger
      </Badge>
    </div>
  )
}

export default BadgeGhost
