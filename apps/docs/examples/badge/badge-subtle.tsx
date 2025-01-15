import { Badge } from "@mijn-ui/react"

const BadgeSubtle = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="subtle" color="default">
        Default
      </Badge>
      <Badge variant="subtle" color="primary">
        Primary
      </Badge>
      <Badge variant="subtle" color="secondary">
        Secondary
      </Badge>
      <Badge variant="subtle" color="success">
        Success
      </Badge>
      <Badge variant="subtle" color="info">
        Info
      </Badge>
      <Badge variant="subtle" color="warning">
        Warning
      </Badge>
      <Badge variant="subtle" color="danger">
        Danger
      </Badge>
    </div>
  )
}

export default BadgeSubtle
