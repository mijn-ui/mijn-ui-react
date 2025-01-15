import { Badge } from "@mijn-ui/react"

const BadgeOutlined = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="outlined" color="default">
        Default
      </Badge>
      <Badge variant="outlined" color="primary">
        Primary
      </Badge>
      <Badge variant="outlined" color="secondary">
        Secondary
      </Badge>
      <Badge variant="outlined" color="success">
        Success
      </Badge>
      <Badge variant="outlined" color="info">
        Info
      </Badge>
      <Badge variant="outlined" color="warning">
        Warning
      </Badge>
      <Badge variant="outlined" color="danger">
        Danger
      </Badge>
    </div>
  )
}

export default BadgeOutlined
