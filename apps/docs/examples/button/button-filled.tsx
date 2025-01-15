import { Button } from "@mijn-ui/react"

const ButtonFilled = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="filled" color="default">
        Default
      </Button>
      <Button variant="filled" color="primary">
        Primary
      </Button>
      <Button variant="filled" color="secondary">
        Secondary
      </Button>
      <Button variant="filled" color="success">
        Success
      </Button>
      <Button variant="filled" color="info">
        Info
      </Button>
      <Button variant="filled" color="warning">
        Warning
      </Button>
      <Button variant="filled" color="danger">
        Danger
      </Button>
    </div>
  )
}

export default ButtonFilled
