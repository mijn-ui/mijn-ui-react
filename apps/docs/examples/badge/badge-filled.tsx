import { Badge } from "@mijn-ui/react"

const BadgeFilled = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Badge variant="filled" color="default">
        Default
      </Badge>
      <Badge variant="filled" color="primary">
        Primary
      </Badge>
      <Badge variant="filled" color="secondary">
        Secondary
      </Badge>
      <Badge variant="filled" color="success">
        Success
      </Badge>
      <Badge variant="filled" color="info">
        Info
      </Badge>
      <Badge variant="filled" color="warning">
        Warning
      </Badge>
      <Badge variant="filled" color="danger">
        Danger
      </Badge>
    </div>
  )
}

export default BadgeFilled
