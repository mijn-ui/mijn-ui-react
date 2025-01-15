import { Button } from "@mijn-ui/react"

const ButtonGhost = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="ghost" color="default">
        Default
      </Button>
      <Button variant="ghost" color="primary">
        Primary
      </Button>
      <Button variant="ghost" color="secondary">
        Secondary
      </Button>
      <Button variant="ghost" color="success">
        Success
      </Button>
      <Button variant="ghost" color="info">
        Info
      </Button>
      <Button variant="ghost" color="warning">
        Warning
      </Button>
      <Button variant="ghost" color="danger">
        Danger
      </Button>
    </div>
  )
}

export default ButtonGhost
