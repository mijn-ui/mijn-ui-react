import { Badge } from "@mijn-ui/react"

const BadgeSizes = () => {
  return (
    <div className="flex flex-wrap items-end gap-4">
      <Badge size="xs">xs</Badge>
      <Badge size="sm">sm</Badge>
      <Badge size="md">md</Badge>
      <Badge size="lg">lg</Badge>
    </div>
  )
}

export default BadgeSizes
